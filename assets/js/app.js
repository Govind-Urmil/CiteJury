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

  const focusInvalidField = (result) => {
    const fieldName = inferInvalidField(result);
    const field = document.querySelector(fieldSelectors[fieldName] || fieldSelectors.title);
    if (!field) return;

    field.setAttribute("aria-invalid", "true");
    field.scrollIntoView({ behavior: "smooth", block: "center" });
    try {
      field.focus({ preventScroll: true });
    } catch {
      field.focus();
    }
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
        focusInvalidField(result);
        return;
      }

      error.hidden = true;
      error.textContent = "";
      clearInvalidFields();
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
