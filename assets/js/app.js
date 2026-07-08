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
  const copyStatus = document.querySelector("#copy-status");
  const modeButtons = document.querySelectorAll("[data-mode-target]");
  const workspacePanels = document.querySelectorAll("[data-workspace-panel]");
  const exampleButtons = document.querySelectorAll("[data-example]");
  const styleAlternatives = document.querySelector("#style-alternatives");
  const styleAlternativeList = document.querySelector("#style-alternative-list");
  const citationAnatomy = document.querySelector("#citation-anatomy");
  const citationAnatomyContent = document.querySelector("#citation-anatomy-content");
  const checkerForm = document.querySelector("#citation-checker-form");
  const checkerInput = document.querySelector("#citation-check-input");
  const checkerHeading = document.querySelector("#checker-heading");
  const checkerSummary = document.querySelector("#checker-summary");
  const checkerComponents = document.querySelector("#checker-components");
  const checkerIssues = document.querySelector("#checker-issues");
  const checkerSuggestion = document.querySelector("#checker-suggestion");
  let currentResult = null;

  const setActionButtonsEnabled = (enabled) => {
    if (copy) copy.disabled = !enabled;
    if (download) download.disabled = !enabled;
  };

  setActionButtonsEnabled(false);

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


  const anatomyGuideLinks = {
    "indian-legal:sc-neutral-judgment": [["Supreme Court judgment guide", "guides/how-to-cite-supreme-court-judgment.html"], ["Indian legal citation guide", "guides/indian-legal-citation.html"]],
    "scc:judgment": [["SCC citation guide", "guides/scc-citation.html"], ["Supreme Court judgment guide", "guides/how-to-cite-supreme-court-judgment.html"]],
    "air:judgment": [["AIR citation guide", "guides/air-citation.html"], ["Indian legal citation guide", "guides/indian-legal-citation.html"]],
    "oscola:judgment": [["OSCOLA guide for Indian law students", "guides/oscola-citation-guide-india.html"], ["Legal citation basics", "guides/legal-citation-basics.html"]],
    "indian-legal:legislation": [["Bare Act citation guide", "guides/how-to-cite-bare-act.html"], ["Legal citation basics", "guides/legal-citation-basics.html"]],
    "indian-legal:constitution": [["Constitution citation guide", "guides/how-to-cite-constitution-of-india.html"], ["Legal citation basics", "guides/legal-citation-basics.html"]]
  };

  const anatomyMistakes = {
    "indian-legal:sc-neutral-judgment": [
      ["INSC 154", "Missing the decision year before INSC."],
      ["2023 SCC 154", "SCC citations require a reporter volume; this also mixes reporter and neutral-citation patterns."],
      ["2023 INSC", "Missing the neutral sequence number."]
    ],
    "scc:judgment": [
      ["2023 SCC 154", "SCC citations normally require a volume before SCC."],
      ["(2023) SCC 154", "The reporter volume is missing."],
      ["(2023) 7 SCC", "The opening page is missing."]
    ],
    "air:judgment": [
      ["AIR SC 154", "The AIR year is missing."],
      ["AIR 2023 154", "The court abbreviation is missing."],
      ["2023 AIR SC", "The AIR opening page is missing."]
    ],
    default: [
      ["Citation copied from memory", "Do not guess citation components; verify them against the source."],
      ["Missing required field", "A citation may look plausible but still be incomplete."],
      ["Wrong source type", "Choose the source type before formatting the citation."]
    ]
  };

  const component = (value, label, detail) => ({ value: value || "—", label, detail });

  const buildAnatomyComponents = (data, result) => {
    const key = `${data.citationStyle}:${data.sourceType}`;
    if (key === "indian-legal:sc-neutral-judgment") {
      return [
        component(data.year, "Decision year", "The year in the Supreme Court neutral citation token."),
        component("INSC", "Supreme Court neutral identifier", "Identifies the citation as a Supreme Court of India neutral citation."),
        component(data.page, "Decision sequence number", "The serial number used in the neutral citation."),
        component(data.title, "Case title", "The official case name should match the source record.")
      ];
    }
    if (data.citationStyle === "scc" && data.sourceType === "judgment") {
      return [
        component(data.year, "Report year", "The year used in the SCC reporter citation."),
        component(data.volume, "SCC volume", "The volume number of Supreme Court Cases."),
        component("SCC", "Reporter", "The Supreme Court Cases reporter abbreviation."),
        component(data.page, "Opening page", "The first page of the reported case."),
        component(data.title, "Case title", "The official case name as reported.")
      ];
    }
    if (data.citationStyle === "air" && data.sourceType === "judgment") {
      return [
        component("AIR", "Reporter", "All India Reporter abbreviation."),
        component(data.year, "Report year", "The AIR reporter year."),
        component(data.court, "Court abbreviation", "The court identifier, for example SC for Supreme Court."),
        component(data.page, "Opening page", "The first page in the AIR report."),
        component(data.title, "Case title", "The official case name as reported.")
      ];
    }
    if (data.sourceType === "legislation") {
      return [
        component(data.title, "Legislation title", "The official Act or legislation title."),
        component(data.year, "Year", "The enactment or publication year where relevant."),
        component(data.page, "Section / provision", "The cited section, rule, schedule, or provision.")
      ];
    }
    if (data.sourceType === "constitution") {
      return [
        component(data.title, "Constitution title", "Usually Constitution of India."),
        component(data.page, "Article / provision", "The cited article, clause, schedule, or provision."),
        component(data.court, "Jurisdiction", "Usually India or the relevant institution if required.")
      ];
    }
    if (data.sourceType === "website") {
      return [
        component(data.title, "Webpage title", "The title of the cited webpage."),
        component(data.reporter, "Website / publisher", "The website or publisher name."),
        component(data.page, "URL", "The full source URL."),
        component(data.year, "Publication year", "Publication or last-updated year if available.")
      ];
    }
    return [
      component(data.title, "Source title", "The main title or case/source name."),
      component(data.year, "Year", "The year used by the selected citation rule."),
      component(data.reporter, "Reporter / publisher", "The reporter, publisher, journal, or website."),
      component(data.page, "Page / provision / URL", "The locator required by the selected source type.")
    ];
  };

  const whyFormatText = (data, result) => {
    const key = `${data.citationStyle}:${data.sourceType}`;
    if (key === "indian-legal:sc-neutral-judgment") return "This format identifies a Supreme Court judgment without depending on a commercial report series. Verify the neutral citation against the official judgment record.";
    if (data.citationStyle === "scc" && data.sourceType === "judgment") return "SCC-style citations identify the case through the Supreme Court Cases reporter. The year, volume, reporter abbreviation and opening page all have distinct roles.";
    if (data.citationStyle === "air" && data.sourceType === "judgment") return "AIR citations use the All India Reporter pattern with year, court abbreviation and opening page. Court abbreviations should be verified.";
    if (data.citationStyle === "oscola") return "OSCOLA formatting is used for legal writing, but local institutions may adapt it for Indian legal sources. Treat the output as a draft and verify your required style.";
    return result.explanation || "This citation follows the currently selected rule scope and should be verified against the source.";
  };

  const checklistItems = (data, result) => {
    const items = ["Official title matches the source record."];
    if (data.year) items.push("Year checked against the source.");
    if (data.citationStyle === "scc") items.push("SCC volume and opening page verified.");
    if (data.citationStyle === "air") items.push("AIR year, court abbreviation and opening page verified.");
    if (data.sourceType === "sc-neutral-judgment") items.push("Neutral sequence number verified.");
    if (data.page && data.sourceType !== "sc-neutral-judgment") items.push("Page, provision, URL or locator checked.");
    items.push("Institution or court-specific citation requirement reviewed.");
    return items;
  };

  const renderCitationAnatomy = (result) => {
    if (!citationAnatomy || !citationAnatomyContent || !result || !result.ok) return;
    const data = getData(new FormData(form));
    const key = `${data.citationStyle}:${data.sourceType}`;
    const components = buildAnatomyComponents(data, result);
    citationAnatomyContent.innerHTML = "";

    const componentList = document.createElement("div");
    componentList.className = "anatomy-components";
    components.forEach((item) => {
      const card = document.createElement("article");
      card.className = "anatomy-component";
      const value = document.createElement("strong");
      value.textContent = item.value;
      const label = document.createElement("span");
      label.textContent = item.label;
      const detail = document.createElement("p");
      detail.textContent = item.detail;
      card.append(value, label, detail);
      componentList.appendChild(card);
    });

    const why = document.createElement("div");
    why.className = "anatomy-explain";
    why.innerHTML = `<h4>Why this format?</h4><p>${whyFormatText(data, result)}</p>`;

    const checklist = document.createElement("div");
    checklist.className = "anatomy-checklist";
    const checklistTitle = document.createElement("h4");
    checklistTitle.textContent = "Verification checklist";
    const checklistUl = document.createElement("ul");
    checklistItems(data, result).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      checklistUl.appendChild(li);
    });
    checklist.append(checklistTitle, checklistUl);

    const mistakes = document.createElement("div");
    mistakes.className = "anatomy-mistakes";
    const mistakeTitle = document.createElement("h4");
    mistakeTitle.textContent = "Common mistakes";
    mistakes.appendChild(mistakeTitle);
    (anatomyMistakes[key] || anatomyMistakes.default).forEach(([wrong, reason]) => {
      const item = document.createElement("p");
      item.innerHTML = `<strong>❌ ${wrong}</strong><br>${reason}`;
      mistakes.appendChild(item);
    });

    const learn = document.createElement("div");
    learn.className = "anatomy-learn";
    const learnTitle = document.createElement("h4");
    learnTitle.textContent = "Learn more";
    const learnList = document.createElement("ul");
    (anatomyGuideLinks[key] || [["Legal citation basics", "guides/legal-citation-basics.html"]]).forEach(([text, href]) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = href;
      a.textContent = text;
      li.appendChild(a);
      learnList.appendChild(li);
    });
    learn.append(learnTitle, learnList);

    citationAnatomyContent.append(componentList, why, checklist, mistakes, learn);
    citationAnatomy.hidden = false;
  };

  const clearCitationAnatomy = () => {
    if (!citationAnatomy || !citationAnatomyContent) return;
    citationAnatomyContent.innerHTML = `
      <div class="anatomy-components">
        <article class="anatomy-component"><strong>2023</strong><span>Decision year</span><p>The year in a Supreme Court neutral citation.</p></article>
        <article class="anatomy-component"><strong>INSC</strong><span>Supreme Court identifier</span><p>Shows the citation is a Supreme Court of India neutral citation.</p></article>
        <article class="anatomy-component"><strong>154</strong><span>Sequence number</span><p>The neutral citation decision sequence.</p></article>
      </div>
      <div class="anatomy-explain"><h4>Try an example</h4><p>Generate a citation to replace this example with citation-specific anatomy, verification steps, and common mistakes.</p></div>
    `;
    citationAnatomy.hidden = false;
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
    renderCitationAnatomy(result);
    setActionButtonsEnabled(true);
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
    clearCitationAnatomy();
    currentResult = null;
    setActionButtonsEnabled(false);
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
        clearCitationAnatomy();
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


  const checkerComponent = (label, value, status = "ok", detail = "") => ({ label, value, status, detail });
  const checkerIssue = (level, message, why, fix = "") => ({ level, message, why, fix });

  const detectCitationPattern = (raw) => {
    const text = clean(raw).replace(/\s+/g, " ");
    if (!text) {
      return {
        type: "Empty input",
        confidence: 0,
        status: "Incomplete",
        components: [],
        issues: [checkerIssue("error", "Citation is empty.", "Citation Checker™ needs text to inspect.", "Paste an existing citation.")],
        suggestion: ""
      };
    }

    let m = text.match(/^(\d{4})\s+INSC\s+(\d+)$/i);
    if (m) {
      return {
        type: "Supreme Court neutral citation",
        confidence: 98,
        status: "Likely complete",
        components: [
          checkerComponent("Year", m[1], "ok", "Decision year detected."),
          checkerComponent("Identifier", "INSC", "ok", "Supreme Court neutral identifier detected."),
          checkerComponent("Sequence", m[2], "ok", "Neutral sequence number detected.")
        ],
        issues: [checkerIssue("warning", "Verify the official case title separately.", "A neutral citation token does not confirm party-name spelling.", "Check the official judgment record.")],
        suggestion: text.toUpperCase()
      };
    }

    m = text.match(/^(\d{4})\s+INSC$/i);
    if (m) {
      return {
        type: "Supreme Court neutral citation",
        confidence: 66,
        status: "Incomplete",
        components: [
          checkerComponent("Year", m[1], "ok"),
          checkerComponent("Identifier", "INSC", "ok"),
          checkerComponent("Sequence", "Missing", "error")
        ],
        issues: [checkerIssue("error", "Neutral sequence number missing.", "SCI neutral citations require the number after INSC.", "Add the verified sequence number after INSC.")],
        suggestion: `${m[1]} INSC [sequence number]`
      };
    }

    m = text.match(/^INSC\s+(\d+)$/i);
    if (m) {
      return {
        type: "Supreme Court neutral citation",
        confidence: 66,
        status: "Incomplete",
        components: [
          checkerComponent("Year", "Missing", "error"),
          checkerComponent("Identifier", "INSC", "ok"),
          checkerComponent("Sequence", m[1], "ok")
        ],
        issues: [checkerIssue("error", "Decision year missing.", "SCI neutral citations require the year before INSC.", "Add the verified decision year before INSC.")],
        suggestion: `[year] INSC ${m[1]}`
      };
    }

    m = text.match(/^\(?(\d{4})\)?\s+(\d+)\s+SCC\s+(\d+)$/i);
    if (m) {
      return {
        type: "SCC citation",
        confidence: 96,
        status: "Likely complete",
        components: [
          checkerComponent("Year", m[1], "ok"),
          checkerComponent("Volume", m[2], "ok"),
          checkerComponent("Reporter", "SCC", "ok"),
          checkerComponent("Opening page", m[3], "ok")
        ],
        issues: [checkerIssue("warning", "Verify the case title and opening page.", "The checker validates structure, not reporter database facts.", "Check the SCC source before submission.")],
        suggestion: `(${m[1]}) ${m[2]} SCC ${m[3]}`
      };
    }

    m = text.match(/^\(?(\d{4})\)?\s+SCC\s+(\d+)$/i);
    if (m) {
      return {
        type: "SCC citation",
        confidence: 74,
        status: "Incomplete",
        components: [
          checkerComponent("Year", m[1], "ok"),
          checkerComponent("Volume", "Missing", "error"),
          checkerComponent("Reporter", "SCC", "ok"),
          checkerComponent("Opening page", m[2], "ok")
        ],
        issues: [checkerIssue("error", "SCC volume missing.", "SCC citations require year, volume, reporter and opening page.", "Add the verified SCC volume before SCC.")],
        suggestion: `(${m[1]}) [volume] SCC ${m[2]}`
      };
    }

    m = text.match(/^AIR\s+(\d{4})\s+([A-Z]{2,6})\s+(\d+)$/i);
    if (m) {
      return {
        type: "AIR citation",
        confidence: 96,
        status: "Likely complete",
        components: [
          checkerComponent("Reporter", "AIR", "ok"),
          checkerComponent("Year", m[1], "ok"),
          checkerComponent("Court", m[2].toUpperCase(), "ok"),
          checkerComponent("Opening page", m[3], "ok")
        ],
        issues: [checkerIssue("warning", "Verify the court abbreviation.", "AIR court abbreviations must match the reporter source.", "Check the AIR citation before submission.")],
        suggestion: `AIR ${m[1]} ${m[2].toUpperCase()} ${m[3]}`
      };
    }

    m = text.match(/^AIR\s+(\d{4})\s+(\d+)$/i);
    if (m) {
      return {
        type: "AIR citation",
        confidence: 74,
        status: "Incomplete",
        components: [
          checkerComponent("Reporter", "AIR", "ok"),
          checkerComponent("Year", m[1], "ok"),
          checkerComponent("Court", "Missing", "error"),
          checkerComponent("Opening page", m[2], "ok")
        ],
        issues: [checkerIssue("error", "Court abbreviation missing.", "AIR citations need the court abbreviation between year and page.", "Add the verified court abbreviation, for example SC where applicable.")],
        suggestion: `AIR ${m[1]} [court] ${m[2]}`
      };
    }

    m = text.match(/^AIR\s+([A-Z]{2,6})\s+(\d+)$/i);
    if (m) {
      return {
        type: "AIR citation",
        confidence: 66,
        status: "Incomplete",
        components: [
          checkerComponent("Reporter", "AIR", "ok"),
          checkerComponent("Year", "Missing", "error"),
          checkerComponent("Court", m[1].toUpperCase(), "ok"),
          checkerComponent("Opening page", m[2], "ok")
        ],
        issues: [checkerIssue("error", "AIR year missing.", "AIR citations require the reporter year after AIR.", "Add the verified AIR year after AIR.")],
        suggestion: `AIR [year] ${m[1].toUpperCase()} ${m[2]}`
      };
    }

    if (/oscola|v\.| v |chapter|article/i.test(text)) {
      return {
        type: "Scoped legal citation draft",
        confidence: 55,
        status: "Needs review",
        components: [checkerComponent("Citation text", text, "warning", "Pattern may be legal, but not enough structure was detected for a confident check.")],
        issues: [checkerIssue("warning", "Pattern not confidently recognized.", "Some legal citations require more context than the checker can infer.", "Use the generator or verify against the relevant guide.")],
        suggestion: ""
      };
    }

    return {
      type: "Unknown citation pattern",
      confidence: 30,
      status: "Incomplete",
      components: [checkerComponent("Input", text, "warning", "No supported pattern detected.")],
      issues: [checkerIssue("error", "Unsupported or incomplete citation pattern.", "The checker currently supports SCI neutral, SCC and AIR patterns first.", "Use the generator or compare with the relevant guide.")],
      suggestion: ""
    };
  };

  const confidenceLabel = (score) => {
    if (score >= 95) return "Likely Complete";
    if (score >= 80) return "Needs Verification";
    return "Incomplete";
  };

  const renderCheckerResult = (report) => {
    if (!checkerHeading || !checkerSummary || !checkerComponents || !checkerIssues || !checkerSuggestion) return;
    checkerHeading.textContent = report.type;
    checkerSummary.innerHTML = `<strong>${confidenceLabel(report.confidence)}</strong> — ${report.confidence}% confidence. ${report.status}.`;
    checkerComponents.innerHTML = "";
    report.components.forEach((item) => {
      const card = document.createElement("article");
      card.className = `checker-component ${item.status}`;
      card.innerHTML = `<strong>${item.label}</strong><span>${item.value}</span>${item.detail ? `<p>${item.detail}</p>` : ""}`;
      checkerComponents.appendChild(card);
    });

    checkerIssues.innerHTML = "";
    report.issues.forEach((issue) => {
      const card = document.createElement("article");
      card.className = `checker-issue ${issue.level}`;
      card.innerHTML = `<strong>${issue.level === "error" ? "✗" : "⚠"} ${issue.message}</strong><p>${issue.why}</p>${issue.fix ? `<p><em>${issue.fix}</em></p>` : ""}`;
      checkerIssues.appendChild(card);
    });

    if (report.suggestion) {
      checkerSuggestion.hidden = false;
      checkerSuggestion.innerHTML = `<strong>Suggested structure</strong><code>${report.suggestion}</code><p>Only use a suggestion after verifying missing factual values from the source.</p>`;
    } else {
      checkerSuggestion.hidden = true;
      checkerSuggestion.innerHTML = "";
    }
  };



  if (checkerForm && checkerInput) {
    checkerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      renderCheckerResult(detectCitationPattern(checkerInput.value));
    });

    checkerForm.addEventListener("reset", () => {
      window.setTimeout(() => {
        if (checkerHeading) checkerHeading.textContent = "Paste a citation to begin";
        if (checkerSummary) checkerSummary.textContent = "Citation Checker™ will show detected components, confidence, issues, and safe correction guidance.";
        if (checkerComponents) checkerComponents.innerHTML = "";
        if (checkerIssues) checkerIssues.innerHTML = "";
        if (checkerSuggestion) {
          checkerSuggestion.hidden = true;
          checkerSuggestion.innerHTML = "";
        }
      }, 0);
    });
  }


  const switchWorkspaceMode = (mode) => {
    modeButtons.forEach((button) => {
      const active = button.dataset.modeTarget === mode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    workspacePanels.forEach((panel) => {
      panel.hidden = panel.dataset.workspacePanel !== mode;
    });
    const target = document.querySelector(`[data-workspace-panel="${mode}"]`);
    if (target) target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  };

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => switchWorkspaceMode(button.dataset.modeTarget));
  });

  const examples = {
    "sc-neutral": {
      citationStyle: "indian-legal",
      sourceType: "sc-neutral-judgment",
      title: "Example v Union of India",
      year: "2023",
      reporter: "",
      volume: "",
      page: "154",
      court: "Supreme Court of India"
    },
    scc: {
      citationStyle: "scc",
      sourceType: "judgment",
      title: "Example v Union of India",
      year: "2023",
      reporter: "SCC",
      volume: "7",
      page: "154",
      court: "Supreme Court of India"
    },
    air: {
      citationStyle: "air",
      sourceType: "judgment",
      title: "Example v Union of India",
      year: "2023",
      reporter: "AIR",
      volume: "",
      page: "154",
      court: "SC"
    },
    constitution: {
      citationStyle: "indian-legal",
      sourceType: "constitution",
      title: "Constitution of India",
      year: "1950",
      reporter: "",
      volume: "",
      page: "Article 21",
      court: "India"
    }
  };

  const fillExample = (name) => {
    const data = examples[name];
    if (!data || !form) return;
    switchWorkspaceMode("generate");
    Object.entries({
      citationStyle: "#citation-style",
      sourceType: "#source-type",
      title: "#source-title",
      year: "#source-year",
      reporter: "#source-reporter",
      volume: "#source-volume",
      page: "#source-page",
      court: "#source-court"
    }).forEach(([key, selector]) => {
      const field = document.querySelector(selector);
      if (field) field.value = data[key] || "";
    });
    updateFieldStatuses();
    const result = window.CiteJuryCitationEngine.generate(getData(new FormData(form)));
    if (result.ok) applyResult(result);
    const panel = document.querySelector(".result-panel");
    if (panel) panel.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  };

  exampleButtons.forEach((button) => {
    button.addEventListener("click", () => fillExample(button.dataset.example));
  });


  if (copy && output) {
    copy.addEventListener("click", async () => {
      const text = output.textContent.trim();
      if (!text || text === "Your citation will appear here.") return;

      try {
        await navigator.clipboard.writeText(text);
        copy.textContent = "Copied ✓";
        if (copyStatus) copyStatus.textContent = "Copied to clipboard.";
        copy.setAttribute("aria-label", "Citation copied to clipboard");
      } catch {
        copy.textContent = "Copy failed";
        copy.setAttribute("aria-label", "Copy citation failed");
      }

      setTimeout(() => {
        copy.textContent = "Copy citation";
          if (copyStatus) copyStatus.textContent = "";
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
