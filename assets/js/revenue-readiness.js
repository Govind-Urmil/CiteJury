(() => {
  "use strict";

  const slots = Array.from(document.querySelectorAll("[data-revenue-slot]"));
  if (!slots.length || !window.fetch) {
    slots.forEach((slot) => { slot.hidden = true; });
    return;
  }

  const hide = (slot, reason) => {
    slot.hidden = true;
    slot.setAttribute("data-revenue-status", reason || "inactive");
    slot.textContent = "";
  };

  const renderInactive = () => {
    slots.forEach((slot) => hide(slot, "inactive"));
  };

  const renderEnabledSlot = (slot, configSlot) => {
    // EP-044 intentionally does not load any third-party ad script.
    // Future ad activation must be approved separately and must update CSP,
    // privacy disclosures, provider IDs, ads.txt/domain checks, and live tests.
    slot.hidden = false;
    slot.setAttribute("data-revenue-status", "reserved-enabled-no-provider");
    slot.innerHTML = "<span>Advertisement</span>";
    if (configSlot && configSlot.format) slot.setAttribute("data-revenue-format", configSlot.format);
  };

  fetch((document.currentScript && document.currentScript.src ? new URL("../data/ads-config.json", document.currentScript.src).href : "assets/data/ads-config.json"), { cache: "no-store" })
    .then((response) => response.ok ? response.json() : Promise.reject(new Error("ad-config-unavailable")))
    .then((config) => {
      if (!config || config.ads_active !== true) {
        renderInactive();
        return;
      }

      const configuredSlots = new Map((config.slots || []).map((slot) => [slot.id, slot]));
      slots.forEach((slot) => {
        const slotId = slot.getAttribute("data-revenue-slot");
        const configSlot = configuredSlots.get(slotId);
        if (!configSlot || configSlot.active !== true) {
          hide(slot, "slot-inactive");
          return;
        }
        if (!config.provider_policy || !config.provider_policy.approved_provider) {
          renderEnabledSlot(slot, configSlot);
          return;
        }
        hide(slot, "provider-not-activated-in-this-release");
      });
    })
    .catch(() => renderInactive());
})();
