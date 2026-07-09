(() => {
  "use strict";

  const clean = (value) => String(value || "").trim();

  const enableWebManifest = () => {
    if (!document.head || document.querySelector('link[rel="manifest"]')) return;
    if (!/^https?:$/.test(window.location.protocol)) return;

    const manifest = document.createElement("link");
    manifest.rel = "manifest";
    manifest.href = document.currentScript && document.currentScript.src ? new URL("../../manifest.webmanifest", document.currentScript.src).pathname : "manifest.webmanifest";
    document.head.appendChild(manifest);
  };

  enableWebManifest();

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#primary-nav");

  if (toggle && nav) {
    const setNavigationOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
      toggle.textContent = open ? "Close" : "Menu";
      nav.classList.toggle("open", open);
      if (!open) nav.scrollTop = 0;
    };

    toggle.addEventListener("click", () => {
      setNavigationOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setNavigationOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setNavigationOpen(false);
        toggle.focus({ preventScroll: true });
      }
    });

    document.addEventListener("click", (event) => {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      const navShell = toggle.closest(".nav-shell");
      if (navShell && navShell.contains(event.target)) return;
      setNavigationOpen(false);
    });

    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 851px)").matches) setNavigationOpen(false);
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
  const workspaceStatus = document.querySelector("#workspace-status");
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

  // EP-073: isolate citation data by active format so values left in hidden
  // fields cannot contaminate another citation rule after switching formats.
  const getData = (formData) => {
    const citationStyle = clean(formData.get("citationStyle"));
    const sourceType = clean(formData.get("sourceType"));
    const key = `${citationStyle}:${sourceType}`;
    const allowedFields = {
      "indian-legal:sc-neutral-judgment": ["title", "year", "page"],
      "indian-legal:judgment": ["title", "year", "reporter", "volume", "page", "court"],
      "scc:judgment": ["title", "year", "volume", "page"],
      "air:judgment": ["title", "year", "court", "page"],
      "oscola:judgment": ["title", "year", "reporter", "page", "court"],
      "oscola:legislation": ["title", "year", "page"],
      "oscola:book": ["title", "year", "reporter"],
      "oscola:journal": ["title", "year", "reporter", "page"],
      "oscola:website": ["title", "year", "reporter", "page"],
      "indian-legal:constitution": ["title", "page"]
    };
    const allowed = new Set(allowedFields[key] || ["title", "year", "reporter", "volume", "page", "court"]);
    const value = (name) => allowed.has(name) ? clean(formData.get(name)) : "";
    return {
      citationStyle,
      sourceType,
      title: value("title"),
      year: value("year"),
      reporter: value("reporter"),
      volume: value("volume"),
      page: value("page"),
      court: value("court")
    };
  };

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
    const genericComponents = [
      component(data.title, "Source title", "The main title or case/source name."),
      component(data.year, "Year", "The year used by the selected citation rule.")
    ];
    if (data.volume) genericComponents.push(component(data.volume, "Volume", "The volume number used by the selected citation rule."));
    genericComponents.push(
      component(data.reporter, "Reporter / publisher", "The reporter, publisher, journal, or website."),
      component(data.page, "Page / provision / URL", "The locator required by the selected source type.")
    );
    return genericComponents;
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
          const copied = await copyTextToClipboard(variant.text);
          button.textContent = copied ? "Copied" : "Copy failed";
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

  const scrollToCitationResult = () => {
    const panel = document.querySelector(".result-panel");
    if (!panel) return;
    window.setTimeout(() => {
      panel.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    }, 80);
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
      scrollToCitationResult();
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
  const plausibleYear = (value) => {
    const year = Number(clean(value));
    const currentYear = new Date().getFullYear();
    return Number.isInteger(year) && year >= 1800 && year <= currentYear;
  };

  const plausiblePositiveNumber = (value, max = 100000) => {
    const text = clean(value);
    if (!/^[1-9]\d*$/.test(text)) return false;
    const number = Number(text);
    return Number.isInteger(number) && number > 0 && number <= max;
  };

  const knownAirCourts = new Set(["SC", "BOM", "CAL", "DEL", "MAD", "ALL", "AP", "KANT", "KER", "MP", "PAT", "RAJ", "GUJ", "ORI", "PH", "P&H", "GAU", "JK", "J&K", "HP", "UTR", "UTT", "CHH", "JHAR", "TRI", "MEG", "SIK", "MAN", "NAG"]);
  const reservedAirCourtTokens = new Set(["AIR", "SCC", "INSC", "SCR"]);

  const assessAirCourt = (value) => {
    const normalized = clean(value).replace(/\./g, "").toUpperCase();
    if (!normalized || reservedAirCourtTokens.has(normalized)) return { ok: false, known: false };
    return { ok: true, known: knownAirCourts.has(normalized) };
  };

  const normalizeDoctorSuggestion = (value) => clean(value).replace(/\s+/g, " ").replace(/\.$/, "");

  const buildCitationDoctorReport = (diagnosis, rawInput) => {
    const original = String(rawInput || "");
    const originalTrimmed = clean(rawInput);
    if (!diagnosis || !originalTrimmed) {
      return {
        summary: "Paste a citation to receive a structured diagnosis.",
        suggested: "",
        reasons: ["No citation text was available to inspect."]
      };
    }

    const suggested = normalizeDoctorSuggestion(diagnosis.suggestion || "");
    const originalComparable = normalizeDoctorSuggestion(originalTrimmed);
    const reasons = [];

    if (diagnosis.type && !["Unknown format", "Unknown citation pattern"].includes(diagnosis.type)) reasons.push(`Detected ${diagnosis.type}.`);
    if (diagnosis.confidence >= 90) reasons.push("The citation contains the core components expected for this pattern.");
    else if (diagnosis.confidence >= 60) reasons.push("The citation resembles a supported pattern but needs manual review.");
    else reasons.push("CiteJury could not confidently match this to a supported citation pattern.");

    (diagnosis.issues || []).forEach((issue) => {
      if (issue && issue.message) reasons.push(issue.fix ? `${issue.message} ${issue.fix}` : issue.message);
    });

    if (suggested && suggested.toLowerCase() !== originalComparable.toLowerCase()) reasons.push("A normalized suggestion is available for comparison.");

    return {
      summary: diagnosis.status === "Likely complete" ? "This citation looks structurally complete, but important citations should still be verified against an authoritative source." : "This citation needs review before you rely on it.",
      suggested,
      reasons: reasons.slice(0, 5)
    };
  };

  const appendCitationDoctorReport = (container, diagnosis, rawInput) => {
    if (!container) return;
    const report = buildCitationDoctorReport(diagnosis, rawInput);
    const card = document.createElement("section");
    card.className = "checker-doctor-card";
    card.setAttribute("aria-label", "Citation Doctor diagnostic report");

    const heading = document.createElement("h4");
    heading.textContent = "Citation Doctor™";

    const summary = document.createElement("p");
    summary.textContent = report.summary;

    const originalLabel = document.createElement("strong");
    originalLabel.textContent = "Original";
    const originalValue = document.createElement("p");
    originalValue.className = "doctor-original";
    originalValue.textContent = String(rawInput || "") || "No citation provided.";

    card.append(heading, summary, originalLabel, originalValue);

    const hasDoctorErrorIssue = Array.isArray(diagnosis.issues) && diagnosis.issues.some((issue) => issue && issue.level === "error" || issue.level === "warning");
    if (report.suggested && !hasDoctorErrorIssue) {
      const suggestedLabel = document.createElement("strong");
      suggestedLabel.textContent = "Suggested";
      const suggestedValue = document.createElement("p");
      suggestedValue.textContent = report.suggested.endsWith(".") ? report.suggested : `${report.suggested}.`;
      const copySuggested = document.createElement("button");
      copySuggested.type = "button";
      copySuggested.className = "secondary-button";
      copySuggested.textContent = "Copy suggested citation";
      copySuggested.addEventListener("click", async () => {
        const copied = await copyTextToClipboard(suggestedValue.textContent);
        copySuggested.textContent = copied ? "Copied suggested citation" : "Copy failed";
        setTimeout(() => { copySuggested.textContent = "Copy suggested citation"; }, 1400);
      });
      card.append(suggestedLabel, suggestedValue, copySuggested);
    }

    const why = document.createElement("strong");
    why.textContent = "Why";
    const list = document.createElement("ul");
    report.reasons.forEach((reason) => {
      const item = document.createElement("li");
      item.textContent = reason;
      list.appendChild(item);
    });
    card.append(why, list);
    container.appendChild(card);
  };



  const detectCitationPattern = (raw) => {
    const text = clean(raw).replace(/\s+/g, " ").replace(/\.$/, "");
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

    // EP-073: recognize common complete citations that include a case name.
    let m = text.match(/^(.+?),\s*AIR\s+(\d{4})\s+([A-Z][A-Z0-9.&]*)\s+(\d+)$/i);
    if (m) {
      const courtCheck = assessAirCourt(m[3]);
      const plausible = plausibleYear(m[2]) && plausiblePositiveNumber(m[4]);
      const issues = [checkerIssue("warning", "Verify party names and reporter details.", "Pattern recognition does not verify the citation against an official source.", "Check the authoritative report.")];
      if (!courtCheck.ok) issues.push(checkerIssue("error", "Court abbreviation needs review.", "This token is not safe as an AIR court abbreviation.", "Use the correct court abbreviation, such as SC for Supreme Court."));
      else if (!courtCheck.known) issues.push(checkerIssue("warning", "Court abbreviation needs verification.", "This court token is not in CiteJury’s common AIR court list.", "Verify the reporter citation before relying on it."));
      if (!plausible) issues.push(checkerIssue("warning", "Year or page number looks implausible.", "The citation shape matches AIR, but one or more numeric values need verification.", "Check the citation against the source."));
      return {
        type: "AIR citation",
        confidence: courtCheck.ok && courtCheck.known && plausible ? 97 : courtCheck.ok ? 72 : 58,
        status: courtCheck.ok && courtCheck.known && plausible ? "Likely complete" : "Needs review",
        components: [
          checkerComponent("Case name", m[1], "ok"),
          checkerComponent("Year", m[2], plausibleYear(m[2]) ? "ok" : "warning"),
          checkerComponent("Court", m[3].toUpperCase(), courtCheck.ok && courtCheck.known ? "ok" : "warning"),
          checkerComponent("Page", m[4], plausiblePositiveNumber(m[4]) ? "ok" : "warning")
        ],
        issues,
        suggestion: `${m[1]}, AIR ${m[2]} ${m[3].toUpperCase()} ${m[4]}`
      };
    }

    m = text.match(/^(.+?),\s*(\d{4})\s+INSC\s+(\d+)$/i);
    if (m) {
      return {
        type: "Supreme Court neutral citation",
        confidence: plausibleYear(m[2]) && plausiblePositiveNumber(m[3]) ? 98 : 72,
        status: plausibleYear(m[2]) && plausiblePositiveNumber(m[3]) ? "Likely complete" : "Needs review",
        components: [
          checkerComponent("Case name", m[1], "ok"),
          checkerComponent("Year", m[2], plausibleYear(m[2]) ? "ok" : "warning"),
          checkerComponent("Identifier", "INSC", "ok"),
          checkerComponent("Sequence", m[3], plausiblePositiveNumber(m[3]) ? "ok" : "warning")
        ],
        issues: [checkerIssue("warning", "Verify the case title against the official judgment.", "Pattern recognition does not verify party-name spelling.", "Check the official Supreme Court record.")],
        suggestion: `${m[1]}, ${m[2]} INSC ${m[3]}`
      };
    }

    m = text.match(/^(\d{4})\s+INSC\s+(\d+)$/i);
    if (m) {
      return {
        type: "Supreme Court neutral citation",
        confidence: plausibleYear(m[1]) && plausiblePositiveNumber(m[2]) ? 98 : 72,
        status: plausibleYear(m[1]) && plausiblePositiveNumber(m[2]) ? "Likely complete" : "Needs review",
        components: [
          checkerComponent("Year", m[1], plausibleYear(m[1]) ? "ok" : "warning", "Decision year detected."),
          checkerComponent("Identifier", "INSC", "ok", "Supreme Court neutral identifier detected."),
          checkerComponent("Sequence", m[2], plausiblePositiveNumber(m[2]) ? "ok" : "warning", "Neutral sequence number detected.")
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

    m = text.match(/^(?:(.+?),\s*)?\(?(\d{4})\)?\s+(\d+)\s+SCC\s+(\d+)$/i);
    if (m) {
      const caseName = m[1] ? m[1].trim() : "Not supplied";
      const hasCaseName = caseName !== "Not supplied";
      const plausible = plausibleYear(m[2]) && plausiblePositiveNumber(m[3], 999) && plausiblePositiveNumber(m[4]);
      const issues = [checkerIssue("warning", "Verify the case title and opening page.", "The checker validates structure, not reporter database facts.", "Check the SCC source before submission.")];
      if (!plausible) issues.push(checkerIssue("warning", "Year, volume or page looks implausible.", "The citation shape matches SCC, but one or more numeric values need verification.", "Check year, volume and page against the source."));
      return {
        type: "SCC citation",
        confidence: plausible ? (hasCaseName ? 97 : 96) : 72,
        status: plausible ? "Likely complete" : "Needs review",
        components: [
          checkerComponent("Case name", caseName, hasCaseName ? "ok" : "warning", hasCaseName ? "Case title detected before the SCC citation." : "Citation-only input is valid, but verify the case title separately."),
          checkerComponent("Year", m[2], plausibleYear(m[2]) ? "ok" : "warning"),
          checkerComponent("Volume", m[3], plausiblePositiveNumber(m[3], 999) ? "ok" : "warning"),
          checkerComponent("Reporter", "SCC", "ok"),
          checkerComponent("Opening page", m[4], plausiblePositiveNumber(m[4]) ? "ok" : "warning")
        ],
        issues,
        suggestion: `${hasCaseName ? `${caseName}, ` : ""}(${m[2]}) ${m[3]} SCC ${m[4]}`
      };
    }

    m = text.match(/^(?:(.+?),\s*)?\(?(\d{4})\)?\s+SCC\s+(\d+)$/i);
    if (m) {
      const caseName = m[1] ? m[1].trim() : "";
      return {
        type: "SCC citation",
        confidence: 74,
        status: "Incomplete",
        components: [
          checkerComponent("Case name", caseName || "Not supplied", caseName ? "ok" : "warning"),
          checkerComponent("Year", m[2], "ok"),
          checkerComponent("Volume", "Missing", "error"),
          checkerComponent("Reporter", "SCC", "ok"),
          checkerComponent("Opening page", m[3], "ok")
        ],
        issues: [checkerIssue("error", "SCC volume missing.", "SCC citations require year, volume, reporter and opening page.", "Add the verified SCC volume before SCC.")],
        suggestion: `${caseName ? `${caseName}, ` : ""}(${m[2]}) [volume] SCC ${m[3]}`
      };
    }

    m = text.match(/^AIR\s+(\d{4})\s+([A-Z&]{2,6})\s+(\d+)$/i);
    if (m) {
      const courtCheck = assessAirCourt(m[2]);
      const plausible = plausibleYear(m[1]) && plausiblePositiveNumber(m[3]);
      const issues = [checkerIssue("warning", "Verify the court abbreviation.", "AIR court abbreviations must match the reporter source.", "Check the AIR citation before submission.")];
      if (!courtCheck.ok) issues.push(checkerIssue("error", "Court abbreviation needs review.", "This token is not safe as an AIR court abbreviation.", "Use the correct court abbreviation, such as SC for Supreme Court."));
      else if (!courtCheck.known) issues.push(checkerIssue("warning", "Court abbreviation needs verification.", "This court token is not in CiteJury’s common AIR court list.", "Verify the reporter citation before relying on it."));
      if (!plausible) issues.push(checkerIssue("warning", "Year or page number looks implausible.", "The citation shape matches AIR, but one or more numeric values need verification.", "Check the citation against the source."));
      return {
        type: "AIR citation",
        confidence: courtCheck.ok && courtCheck.known && plausible ? 96 : courtCheck.ok ? 72 : 58,
        status: courtCheck.ok && courtCheck.known && plausible ? "Likely complete" : "Needs review",
        components: [
          checkerComponent("Reporter", "AIR", "ok"),
          checkerComponent("Year", m[1], plausibleYear(m[1]) ? "ok" : "warning"),
          checkerComponent("Court", m[2].toUpperCase(), courtCheck.ok && courtCheck.known ? "ok" : "warning"),
          checkerComponent("Opening page", m[3], plausiblePositiveNumber(m[3]) ? "ok" : "warning")
        ],
        issues,
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

    m = text.match(/^AIR\s+([A-Z&]{2,6})\s+(\d+)$/i);
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

  const appendText = (parent, tag, text, className = "") => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    el.textContent = text;
    parent.appendChild(el);
    return el;
  };

  const renderCheckerResult = (report) => {
    if (!checkerHeading || !checkerSummary || !checkerComponents || !checkerIssues || !checkerSuggestion) return;
    checkerHeading.textContent = report.type;
    checkerSummary.textContent = `${confidenceLabel(report.confidence)} — ${report.confidence}% confidence. ${report.status}.`;

    checkerComponents.replaceChildren();
    report.components.forEach((item) => {
      const card = document.createElement("article");
      card.className = `checker-component ${item.status}`;
      appendText(card, "strong", item.label);
      appendText(card, "span", item.value);
      if (item.detail) appendText(card, "p", item.detail);
      checkerComponents.appendChild(card);
    });

    checkerIssues.replaceChildren();
    report.issues.forEach((issue) => {
      const card = document.createElement("article");
      card.className = `checker-issue ${issue.level}`;
      appendText(card, "strong", `${issue.level === "error" || issue.level === "warning" ? "✗" : "⚠"} ${issue.message}`);
      appendText(card, "p", issue.why);
      if (issue.fix) appendText(card, "p", issue.fix, "checker-fix");
      checkerIssues.appendChild(card);
    });

    checkerSuggestion.hidden = false;
    checkerSuggestion.replaceChildren();

    if (report.suggestion) {
      appendText(checkerSuggestion, "strong", "Suggested structure");
      appendText(checkerSuggestion, "code", report.suggestion);
      appendText(checkerSuggestion, "p", "Only use a suggestion after verifying missing factual values from the source.");
    }

    appendCitationDoctorReport(checkerSuggestion, report, checkerInput ? checkerInput.value : "");
  };


  if (checkerForm && checkerInput) {
    checkerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (checkerHeading) checkerHeading.textContent = "Checking citation…";
      if (checkerSummary) checkerSummary.textContent = "CiteJury is reviewing the pasted citation.";
      if (checkerComponents) checkerComponents.replaceChildren();
      if (checkerIssues) checkerIssues.replaceChildren();
      if (checkerSuggestion) {
        checkerSuggestion.hidden = true;
        checkerSuggestion.replaceChildren();
      }
      try {
        renderCheckerResult(detectCitationPattern(checkerInput.value));
      } catch (err) {
        if (checkerHeading) checkerHeading.textContent = "Unable to check citation";
        if (checkerSummary) checkerSummary.textContent = "CiteJury could not safely inspect this citation. Please review the text and try again.";
        if (checkerIssues) {
          const card = document.createElement("article");
          card.className = "checker-issue error";
          appendText(card, "strong", "✗ Checker error");
          appendText(card, "p", "The previous result has been cleared so stale guidance is not shown.");
          checkerIssues.appendChild(card);
        }
      }
    });

    checkerForm.addEventListener("reset", () => {
      window.setTimeout(() => {
        if (checkerHeading) checkerHeading.textContent = "Paste a citation to begin";
        if (checkerSummary) checkerSummary.textContent = "Citation Checker™ will show detected components, confidence, issues, and safe correction guidance.";
        if (checkerComponents) checkerComponents.replaceChildren();
        if (checkerIssues) checkerIssues.replaceChildren();
        if (checkerSuggestion) {
          checkerSuggestion.hidden = true;
          checkerSuggestion.replaceChildren();
        }
      }, 0);
    });
  }


  const switchWorkspaceMode = (mode, options = {}) => {
    const requested = mode === "check" ? "check" : "generate";
    modeButtons.forEach((button) => {
      const active = button.dataset.modeTarget === requested;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    workspacePanels.forEach((panel) => {
      const active = panel.dataset.workspacePanel === requested;
      panel.hidden = !active;
      panel.setAttribute("aria-hidden", String(!active));
    });
    if (workspaceStatus) {
      workspaceStatus.textContent = requested === "check" ? "Check Citation workspace selected." : "Generate Citation workspace selected.";
    }
    if (options.updateHash !== false) {
      const nextHash = requested === "check" ? "#checker" : "#generator";
      if (window.location.hash !== nextHash) window.history.replaceState({ workspace: requested }, "", nextHash);
    }
    const target = requested === "check" ? document.querySelector("#checker") : document.querySelector("#citation-generator-panel");
    if (target && options.scroll !== false) target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    if (options.focus !== false) {
      const focusTarget = requested === "check" ? checkerInput : document.querySelector("#citation-style");
      window.setTimeout(() => focusTarget && focusTarget.focus({ preventScroll: true }), 120);
    }
  };

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => switchWorkspaceMode(button.dataset.modeTarget, { updateHash: true, focus: true }));
  });


  const applyWorkspaceFromHash = () => {
    if (!workspacePanels.length) return;
    if (window.location.hash === "#checker") {
      switchWorkspaceMode("check", { updateHash: false, scroll: false, focus: false });
    } else if (window.location.hash === "#generator" || !window.location.hash) {
      switchWorkspaceMode("generate", { updateHash: false, scroll: false, focus: false });
    } else {
      switchWorkspaceMode("generate", { updateHash: false, scroll: false, focus: false });
      window.history.replaceState({ workspace: "generate" }, "", "#generator");
    }
  };

  const hasWorkspaceRouter = Boolean(
    workspacePanels.length &&
    document.querySelector("[data-workspace-panel='generate']") &&
    document.querySelector("[data-workspace-panel='check']") &&
    document.querySelector("#citation-generator-panel") &&
    document.querySelector("#checker")
  );

  if (hasWorkspaceRouter) {
    window.addEventListener("hashchange", applyWorkspaceFromHash);
    window.addEventListener("popstate", applyWorkspaceFromHash);
    applyWorkspaceFromHash();
  }

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
      page: "21",
      court: "India"
    }
  };

  const fillExample = (name) => {
    const data = examples[name];
    if (!data || !form) return;
    switchWorkspaceMode("generate", { updateHash: false, focus: false });
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



  const copyTextToClipboard = async (text) => {
    const legacyCopy = () => {
      const temp = document.createElement("textarea");
      temp.value = text;
      temp.setAttribute("readonly", "");
      temp.style.position = "fixed";
      temp.style.top = "0";
      temp.style.left = "0";
      temp.style.width = "1px";
      temp.style.height = "1px";
      temp.style.opacity = "0";
      document.body.appendChild(temp);
      temp.focus({ preventScroll: true });
      temp.select();
      temp.setSelectionRange(0, temp.value.length);
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } finally {
        document.body.removeChild(temp);
      }
      return ok;
    };

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        return legacyCopy();
      }
    }
    return legacyCopy();
  };

  if (copy && output) {
    copy.addEventListener("click", async () => {
      const text = output.textContent.trim();
      if (!text || text === "Your citation will appear here.") return;

      try {
        const copied = await copyTextToClipboard(text);
        if (!copied) throw new Error("copy-failed");
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
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();

      window.setTimeout(() => {
        URL.revokeObjectURL(url);
        anchor.remove();
      }, 1000);
    });
  }

  document.querySelectorAll("[data-ad-slot]").forEach((slot) => {
    slot.setAttribute("data-ad-status", "reserved");
  });
})();


/* TI2B_SAFE_DOCTOR */
function TI2B_SAFE_DOCTOR(diag){
  if(!diag) return false;
  const c=Number(diag.confidence||0);
  const st=(diag.status||'').toLowerCase();
  const issues=Array.isArray(diag.issues)?diag.issues:[];
  const unsafe=issues.some(i=>i&&(/warning|error/i).test(i.level||''));
  return c>=90 && st==='likely complete' && !unsafe;
}
