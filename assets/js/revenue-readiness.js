(() => {
  "use strict";

  const slots = Array.from(document.querySelectorAll("[data-revenue-slot]"));
  const ADSENSE_ORIGIN = "https://pagead2.googlesyndication.com";
  const ADSENSE_SCRIPT = `${ADSENSE_ORIGIN}/pagead/js/adsbygoogle.js`;
  const CLIENT_ID_PATTERN = /^ca-pub-\d{16}$/;
  const SLOT_PATTERN = /^\d{5,}$/;

  const hide = (slot, reason) => {
    slot.hidden = true;
    slot.setAttribute("data-revenue-status", reason || "inactive");
    slot.textContent = "";
  };

  const hideAll = (reason) => {
    slots.forEach((slot) => hide(slot, reason));
  };

  const explicitActivation = document.currentScript && document.currentScript.dataset.revenueEnabled === "true";

  if (!explicitActivation) {
    hideAll("inactive");
    return;
  }

  if (!slots.length || !window.fetch) {
    hideAll("unsupported");
    return;
  }

  const configUrl = () => {
    if (document.currentScript && document.currentScript.src) {
      return new URL("../data/ads-config.json", document.currentScript.src).href;
    }
    return "assets/data/ads-config.json";
  };

  const isValidClientId = (value) => CLIENT_ID_PATTERN.test(String(value || "").trim());
  const isValidAdSlot = (value) => SLOT_PATTERN.test(String(value || "").trim());

  const loadAdsenseScript = (clientId) => new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-citejury-adsense]");
    if (existing) {
      resolve(existing);
      return;
    }
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.citejuryAdsense = "true";
    script.src = `${ADSENSE_SCRIPT}?client=${encodeURIComponent(clientId)}`;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error("adsense-script-failed"));
    document.head.appendChild(script);
  });

  const renderAdsenseSlot = (slot, configSlot, clientId) => {
    const adSlot = String(configSlot.ad_slot || "").trim();
    if (!isValidAdSlot(adSlot)) {
      hide(slot, "invalid-ad-slot");
      return;
    }

    slot.hidden = false;
    slot.setAttribute("data-revenue-status", "adsense-ready");
    slot.setAttribute("data-revenue-provider", "google-adsense");
    slot.innerHTML = "";

    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", clientId);
    ins.setAttribute("data-ad-slot", adSlot);
    ins.setAttribute("data-ad-format", configSlot.format || "auto");
    ins.setAttribute("data-full-width-responsive", "true");
    ins.setAttribute("aria-label", "Advertisement");
    slot.appendChild(ins);

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      hide(slot, "adsense-render-failed");
    }
  };

  fetch(configUrl(), { cache: "default" })
    .then((response) => response.ok ? response.json() : Promise.reject(new Error("ad-config-unavailable")))
    .then((config) => {
      if (!config || config.ads_active !== true) {
        hideAll("inactive");
        return;
      }

      const provider = config.provider_policy || {};
      const providerName = provider.approved_provider || config.approved_provider;
      const clientId = String(provider.publisher_client_id || "").trim();

      if (providerName !== "google-adsense" || !isValidClientId(clientId)) {
        hideAll("provider-not-ready");
        return;
      }

      const configuredSlots = new Map((config.slots || []).map((item) => [item.id, item]));
      const activeSlots = slots.filter((slot) => {
        const slotConfig = configuredSlots.get(slot.getAttribute("data-revenue-slot"));
        if (!slotConfig || slotConfig.active !== true) {
          hide(slot, "slot-inactive");
          return false;
        }
        return true;
      });

      if (!activeSlots.length) {
        return;
      }

      loadAdsenseScript(clientId)
        .then(() => {
          activeSlots.forEach((slot) => renderAdsenseSlot(slot, configuredSlots.get(slot.getAttribute("data-revenue-slot")), clientId));
        })
        .catch(() => hideAll("adsense-script-failed"));
    })
    .catch(() => hideAll("config-unavailable"));
})();
