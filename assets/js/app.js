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


  const baseFieldLabels = {
    title: "Case / source title",
    year: "Year",
    reporter: "Reporter / publisher / website",
    volume: "Volume",
    page: "Page / section / article / URL / neutral sequence",
    court: "Court / institution"
  };

  const fieldLabelProfiles = {
    "indian-legal:sc-neutral-judgment": {
      title: ["Case title", "Use the official case title from the Supreme Court record."],
      year: ["Neutral citation year", "Enter the four-digit year in the Supreme Court neutral citation token."],
      reporter: ["Reporter / parallel citation", "Optional: add SCC, AIR, SCR, or another report reference only if you have verified it."],
      volume: ["Reporter volume", "Optional unless you are also adding a verified reporter citation."],
      page: ["Neutral sequence number", "Required: enter the serial number after INSC in the neutral citation."],
      court: ["Court", "Use Supreme Court of India if relevant to your citation requirement."]
    },
    "scc:judgment": {
      title: ["Case title", "Use the official case title exactly as reported."],
      year: ["SCC report year", "Use the year attached to the SCC citation."],
      reporter: ["Reporter", "Use SCC for Supreme Court Cases citations."],
      volume: ["SCC volume", "Required for SCC-style citations."],
      page: ["Opening page", "Use the first page of the report, not a PDF page number."],
      court: ["Court", "Optional unless your institution requires the court name."]
    },
    "air:judgment": {
      title: ["Case title", "Use the official case title exactly as reported."],
      year: ["AIR year", "Use the AIR reporter year."],
      reporter: ["Reporter", "Use AIR for All India Reporter citations."],
      volume: ["Volume", "Usually optional for AIR citations unless your source requires it."],
      page: ["AIR page number", "Use the AIR opening page."],
      court: ["Court abbreviation", "Use the verified AIR court abbreviation, for example SC or Bom."]
    },
    "indian-legal:legislation": {
      title: ["Act / legislation title", "Use the official short title of the Act or legislation."],
      year: ["Year", "Use the enactment year when available."],
      reporter: ["Source / publisher", "Optional: add the source where you found the legislation."],
      volume: ["Volume", "Usually optional for legislation."],
      page: ["Section number", "Enter the section, rule, or schedule if you are citing a specific provision."],
      court: ["Jurisdiction / institution", "Optional: add jurisdiction or institution if needed."]
    },
    "indian-legal:constitution": {
      title: ["Constitution title", "Usually Constitution of India."],
      year: ["Year", "Usually optional unless your institution asks for it."],
      reporter: ["Source / publisher", "Optional: add the source used."],
      volume: ["Volume", "Usually optional for constitutional provisions."],
      page: ["Article number", "Enter the article, clause, or schedule being cited."],
      court: ["Jurisdiction", "Optional: add India or institution if needed."]
    },
    "indian-legal:website": {
      title: ["Webpage title", "Use the page title visible on the legal website."],
      year: ["Publication year", "Enter the publication or last-updated year if available."],
      reporter: ["Website name", "Enter the website or publisher name."],
      volume: ["Volume", "Usually optional for websites."],
      page: ["URL", "Enter the full webpage URL."],
      court: ["Institution", "Optional: add the publishing institution if relevant."]
    },
    "oscola:book": {
      title: ["Author and book title", "Enter author and title until dedicated author fields are added."],
      year: ["Publication year", "Use the book publication year."],
      reporter: ["Publisher", "Enter the publisher name."],
      volume: ["Edition / volume", "Optional: include edition or volume where relevant."],
      page: ["Page / pinpoint", "Optional: add a page or pinpoint reference."],
      court: ["Jurisdiction", "Usually optional for books."]
    },
    "oscola:journal": {
      title: ["Author and article title", "Enter author and article title until dedicated author fields are added."],
      year: ["Publication year", "Use the journal publication year."],
      reporter: ["Journal name", "Enter the journal name."],
      volume: ["Journal volume", "Enter the journal volume where available."],
      page: ["First page / pinpoint", "Enter the article first page or pinpoint."],
      court: ["Institution", "Usually optional for journal articles."]
    },
    "oscola:website": {
      title: ["Webpage title", "Use the page title."],
      year: ["Publication year", "Use publication or last-updated year if available."],
      reporter: ["Website / publisher", "Enter the website or publisher name."],
      volume: ["Volume", "Usually optional for websites."],
      page: ["URL", "Enter the full webpage URL."],
      court: ["Institution", "Optional: add institution if relevant."]
    }
  };

  const getFieldProfile = (data) => {
    const key = `${data.citationStyle}:${data.sourceType}`;
    const profile = fieldLabelProfiles[key] || {};
    if (data.sourceType === "book") {
      return { ...profile, title: profile.title || ["Author and title", "Enter author and title details."], reporter: profile.reporter || ["Publisher", "Enter the publisher if available."] };
    }
    if (data.sourceType === "journal") {
      return { ...profile, title: profile.title || ["Article title", "Enter the journal article title."], reporter: profile.reporter || ["Journal name", "Enter the journal name."] };
    }
    if (data.sourceType === "website") {
      return { ...profile, title: profile.title || ["Webpage title", "Enter the webpage title."], reporter: profile.reporter || ["Website name", "Enter the website name."], page: profile.page || ["URL", "Enter the full URL."] };
    }
    return profile;
  };

  const fieldDisplayLabel = (name) => {
    const marker = document.querySelector(`[data-field-label="${name}"]`);
    return marker ? marker.textContent.trim() : baseFieldLabels[name] || name;
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
    const profile = getFieldProfile(data);
    fieldNames.forEach((name) => {
      const marker = document.querySelector(`[data-field-status="${name}"]`);
      const label = document.querySelector(`[data-field-label="${name}"]`);
      const field = document.querySelector(fieldSelectors[name]);
      const help = field ? document.querySelector(`#${field.id.replace("source-", "")}-help`) : null;
      const required = (spec.required || []).includes(name);
      const display = profile[name] || [baseFieldLabels[name], ""];
      if (label) label.textContent = display[0];
      if (help && display[1]) help.textContent = display[1];
      if (!marker) return;
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
      message.textContent = `${fieldDisplayLabel(name)} is required for this citation type.`;
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

  const buildDisplayVariants = (result) => {
    if (!result || !result.ok) return [];
    const data = getData(new FormData(form));
    const title = data.title || "Untitled source";
    const year = data.year || "n.d.";
    const publisher = data.reporter || data.court || "source";
    const legalVariants = window.CiteJuryCitationEngine.generateStyleAlternatives(data)
      .filter((item) => item.ok)
      .map((item) => ({
        label: item.styleLabel,
        text: item.citation,
        note: "Authority-scoped legal citation draft."
      }));

    const displayOnly = [
      {
        label: "APA-style display draft",
        text: `${title}. (${year}). ${publisher}.`,
        note: "Convenience display only, not full APA legal citation support. Verify before academic submission."
      },
      {
        label: "Chicago-style display draft",
        text: `${title}. ${publisher}, ${year}.`,
        note: "Convenience display only, not full Chicago legal citation support. Verify before academic submission."
      }
    ];

    return [...legalVariants, ...displayOnly];
  };

  const renderStyleAlternatives = (variants = []) => {
    if (!styleAlternatives || !styleAlternativeList) return;

    styleAlternativeList.innerHTML = "";
    if (!variants.length) {
      styleAlternatives.hidden = true;
      return;
    }

    styleAlternatives.hidden = false;

    const warning = document.createElement("p");
    warning.className = "style-warning";
    warning.textContent = "Alternative display styles are drafts. Verify requirements before academic or legal submission.";
    styleAlternativeList.appendChild(warning);

    variants.forEach((variant) => {
      const card = document.createElement("article");
      card.className = "style-alternative";

      const heading = document.createElement("h4");
      heading.textContent = variant.label;

      const preview = document.createElement("p");
      preview.textContent = variant.text;

      const note = document.createElement("small");
      note.textContent = variant.note || "Draft citation display.";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "btn secondary compact";
      button.textContent = "Copy this style";
      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(variant.text);
          button.textContent = "Copied";
        } catch {
          button.textContent = "Copy failed";
        }
        setTimeout(() => {
          button.textContent = "Copy this style";
        }, 1400);
      });

      card.append(heading, preview, note, button);
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
      renderStyleAlternatives(buildDisplayVariants(result));
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
