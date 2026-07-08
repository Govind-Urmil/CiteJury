(() => {
  "use strict";

  const clean = (value) => String(value || "").trim();

  const enableWebManifest = () => {
    if (!document.head || document.querySelector('link[rel="manifest"]')) return;
    if (!/^https?:$/.test(window.location.protocol)) return;

    const manifest = document.createElement("link");
    manifest.rel = "manifest";
    manifest.href = "manifest.webmanifest";
    document.head.appendChild(manifest);
  };

  enableWebManifest();

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("open");
      }
    });
  }

  const form = document.querySelector("#citation-form");
  const output = document.querySelector("#citation-output");
  const explain = document.querySelector("#citation-explanation");
  const parts = document.querySelector("#citation-parts");
  const validationBox = document.querySelector("#citation-validation");
  const error = document.querySelector("#form-error");
  const copy = document.querySelector("#copy-citation");
  const download = document.querySelector("#download-citation");
  const styleAlternatives = document.querySelector("#style-alternatives");
  const styleAlternativeList = document.querySelector("#style-alternative-list");
  let currentResult = null;

  const fieldSelectors = {
    title: "#source-title",
    year: "#source-year",
    reporter: "#source-reporter",
    volume: "#source-volume",
    page: "#source-page",
    court: "#source-court"
  };

  const clearInvalidFields = () => {
    Object.values(fieldSelectors).forEach((selector) => {
      const field = document.querySelector(selector);
      if (field) field.removeAttribute("aria-invalid");
    });
  };

  const inferInvalidField = (result) => {
    const missing = result && result.validation && result.validation.missingRequiredFields;
    if (Array.isArray(missing) && missing.length) return missing[0];

    const message = String((result && result.error) || "").toLowerCase();
    if (/title|case or source/.test(message)) return "title";
    if (/year/.test(message)) return "year";
    if (/volume/.test(message)) return "volume";
    if (/reporter|publisher|journal|website field/.test(message)) return "reporter";
    if (/page|sequence|url|section|article/.test(message)) return "page";
    if (/court|institution|abbreviation/.test(message)) return "court";
    return "title";
  };

  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const getHeaderOffset = () => {
    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    return Math.max(16, Math.ceil(headerHeight + 18));
  };

  const scrollFieldIntoView = (field) => {
    const rect = field.getBoundingClientRect();
    const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    const targetY = window.pageYOffset + rect.top - Math.max(getHeaderOffset(), Math.round(viewportHeight * 0.22));
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: prefersReducedMotion() ? "auto" : "smooth"
    });
  };

  const focusInvalidField = (result) => {
    const fieldName = inferInvalidField(result);
    const field = document.querySelector(fieldSelectors[fieldName] || fieldSelectors.title);
    if (!field) return;

    field.setAttribute("aria-invalid", "true");
    field.setAttribute("aria-describedby", [field.getAttribute("aria-describedby"), "form-error"].filter(Boolean).join(" "));

    // Mobile Chrome can ignore a scroll that happens immediately before/after
    // focusing an input because the virtual keyboard changes the visual viewport.
    // Use an explicit page-position calculation, then repeat after focus/layout
    // stabilization so the invalid field remains visible above the keyboard.
    scrollFieldIntoView(field);
    window.setTimeout(() => {
      try {
        field.focus({ preventScroll: true });
      } catch {
        field.focus();
      }
      scrollFieldIntoView(field);
      window.setTimeout(() => scrollFieldIntoView(field), 260);
    }, 80);
  };

  const getData = (formData) => ({
    citationStyle: clean(formData.get("citationStyle")),
    sourceType: clean(formData.get("sourceType")),
    title: clean(formData.get("title")),
    year: clean(formData.get("year")),
    reporter: clean(formData.get("reporter")),
    volume: clean(formData.get("volume")),
    page: clean(formData.get("page")),
    court: clean(formData.get("court"))
  });

  const fieldNames = Object.keys(fieldSelectors);
  const getCurrentSpec = () => {
    const data = getData(new FormData(form));
    return window.CiteJuryCitationEngine.getRuleSpec ? window.CiteJuryCitationEngine.getRuleSpec(data) : null;
  };
  const clearInlineErrors = () => {
    document.querySelectorAll(".field-error").forEach((node) => node.remove());
    clearInvalidFields();
  };
  const updateFieldStatuses = () => {
    if (!form || !window.CiteJuryCitationEngine.getRuleSpec) return;
    const data = getData(new FormData(form));
    const spec = window.CiteJuryCitationEngine.getRuleSpec(data);
    fieldNames.forEach((name) => {
      const marker = document.querySelector(`[data-field-status="${name}"]`);
      if (!marker) return;
      const required = (spec.required || []).includes(name);
      marker.textContent = required ? "Required *" : "Optional";
      marker.setAttribute("aria-label", required ? "Required field" : "Optional field");
      marker.classList.toggle("required", required);
    });
  };
  const renderInlineErrors = (result) => {
    clearInlineErrors();
    const missing = result?.validation?.missingRequiredFields || [inferInvalidField(result)];
    missing.forEach((name) => {
      const field = document.querySelector(fieldSelectors[name]);
      if (!field) return;
      field.setAttribute("aria-invalid", "true");
      const message = document.createElement("div");
      message.className = "field-error";
      message.id = `${field.id}-error`;
      message.setAttribute("role", "alert");
      message.textContent = `${name === "page" ? "Page / section / article / URL / neutral sequence" : name.charAt(0).toUpperCase()+name.slice(1)} is required for this citation type.`;
      field.parentNode.insertBefore(message, field);
      field.setAttribute("aria-describedby", [field.getAttribute("aria-describedby"), message.id].filter(Boolean).join(" "));
    });
  };

  const renderParts = (items = []) => {
    if (!parts) return;
    parts.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      parts.appendChild(li);
    });
  };

  const applyResult = (result) => {
    if (!result || !result.ok) return;
    currentResult = result;
    output.textContent = result.citation;
    const limitationText = result.verification && result.verification.limitations
      ? ` Limitations: ${result.verification.limitations.join(" ")}`
      : "";
    explain.textContent = `${result.explanation} ${result.verification ? result.verification.message : ""}${limitationText}`;
    renderParts(result.parts);
    renderValidation(result.validation);
  };

  const renderValidation = (validation) => {
    if (!validationBox) return;
    if (!validation) {
      validationBox.hidden = true;
      validationBox.textContent = "";
      return;
    }

    validationBox.hidden = false;
    validationBox.innerHTML = "";

    const heading = document.createElement("strong");
    heading.textContent = `Validation: ${validation.severity}`;
    const summary = document.createElement("p");
    summary.textContent = validation.summary;

    const list = document.createElement("ul");
    (validation.checklist || []).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });

    validationBox.append(heading, summary, list);
  };

  const renderStyleAlternatives = (alternatives = []) => {
    if (!styleAlternatives || !styleAlternativeList) return;

    styleAlternativeList.innerHTML = "";
    if (!alternatives.length) {
      styleAlternatives.hidden = true;
      return;
    }

    styleAlternatives.hidden = false;

    alternatives.forEach((alternative) => {
      const card = document.createElement("article");
      card.className = `style-alternative${alternative.ok ? "" : " unavailable"}`;

      const heading = document.createElement("h4");
      heading.textContent = alternative.styleLabel;

      const preview = document.createElement("p");
      preview.textContent = alternative.ok ? alternative.citation : alternative.unavailableReason;

      card.append(heading, preview);

      if (alternative.ok) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn secondary compact";
        button.textContent = "Use this style";
        button.addEventListener("click", () => {
          const selected = window.CiteJuryCitationEngine.generate({
            ...window.CiteJuryCitationEngine.normalize(getData(new FormData(form))),
            citationStyle: alternative.citationStyle
          });
          if (selected.ok) applyResult(selected);
        });
        card.appendChild(button);
      }

      styleAlternativeList.appendChild(card);
    });
  };

  const resetPreview = () => {
    if (error) {
      error.hidden = true;
      error.textContent = "";
    }
    clearInvalidFields();

    if (output) output.textContent = "Your citation will appear here.";
    if (explain) explain.textContent = "Fill the form and generate a citation to see the explanation.";
    renderParts([]);
    renderValidation(null);
    renderStyleAlternatives([]);
    currentResult = null;
  };

  if (form && output && explain && error && window.CiteJuryCitationEngine) {
    // Use CiteJury's own validation instead of native browser blocking validation.
    // Native validation can prevent the submit handler from running, which means
    // users do not get the guided scroll/focus behavior.
    form.noValidate = true;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const result = window.CiteJuryCitationEngine.generate(getData(new FormData(form)));

      if (!result.ok) {
        error.hidden = false;
        error.textContent = result.error;
        output.textContent = "Your citation will appear here.";
        explain.textContent = "Fix the highlighted issue and generate again.";
        renderParts([]);
        renderValidation(result.validation);
        renderInlineErrors(result);
        focusInvalidField(result);
        return;
      }

      error.hidden = true;
      error.textContent = "";
      clearInlineErrors();
      applyResult(result);
      renderStyleAlternatives(window.CiteJuryCitationEngine.generateStyleAlternatives(getData(new FormData(form))));
    });

    form.addEventListener("reset", () => setTimeout(resetPreview, 0));
    form.addEventListener("input", (event) => {
      if (event.target && event.target.matches("input, select, textarea")) {
        event.target.removeAttribute("aria-invalid");
      }
    });
  }

  if (form) {
    updateFieldStatuses();
    form.addEventListener("change", updateFieldStatuses);
  }

  if (copy && output) {
    copy.addEventListener("click", async () => {
      const text = output.textContent.trim();
      if (!text || text === "Your citation will appear here.") return;

      try {
        await navigator.clipboard.writeText(text);
        copy.textContent = "Copied";
        copy.setAttribute("aria-label", "Citation copied to clipboard");
      } catch {
        copy.textContent = "Copy failed";
        copy.setAttribute("aria-label", "Copy citation failed");
      }

      setTimeout(() => {
        copy.textContent = "Copy citation";
        copy.removeAttribute("aria-label");
      }, 1400);
    });
  }

  if (download && output) {
    download.addEventListener("click", () => {
      const text = output.textContent.trim();
      if (!text || text === "Your citation will appear here.") return;

      const blob = new Blob([`${text}\n`], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      anchor.href = url;
      anchor.download = "citejury-citation.txt";
      anchor.click();

      URL.revokeObjectURL(url);
    });
  }

  document.querySelectorAll("[data-ad-slot]").forEach((slot) => {
    slot.setAttribute("data-ad-status", "reserved");
  });
})();
