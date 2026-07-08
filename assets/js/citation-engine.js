/*
  CiteJury Citation Engine
  EP-034
  Browser-first, static-site compatible, no backend dependency.
*/

(() => {
  "use strict";

  const clean = (value) => String(value || "").trim();
  const digitsOnly = (value) => /^\d+$/.test(clean(value));

  const normalizeCourt = (value) => clean(value).replace(/\s+/g, " ");

  const normalize = (data = {}) => ({
    citationStyle: clean(data.citationStyle || "indian-legal"),
    sourceType: clean(data.sourceType || "judgment"),
    title: clean(data.title),
    year: clean(data.year),
    reporter: clean(data.reporter),
    volume: clean(data.volume),
    page: clean(data.page),
    court: normalizeCourt(data.court)
  });

  const ruleSpecs = {
    "indian-legal:sc-neutral-judgment": {
      id: "india-supreme-court-neutral-citation-v1",
      status: "verified-format-scope",
      authorityFamily: "Supreme Court of India neutral citation notice dated 06 July 2023",
      confidence: "high-for-neutral-token-format-medium-for-user-entered-case-name",
      required: ["title", "year", "page"],
      recommended: [],
      limitations: [
        "Only covers Supreme Court of India neutral citation token formatting: year + INSC + sequence number.",
        "CiteJury does not verify whether the entered sequence number belongs to the entered case.",
        "Users should verify the neutral citation against the official Supreme Court/e-SCR source."
      ]
    },
    "indian-legal:judgment": {
      id: "generic-indian-judgment-readable-v2",
      status: "scoped-helper",
      authorityFamily: "India-first citation practice with stronger neutral-citation priority",
      confidence: "medium-low",
      required: ["title"],
      recommended: ["year", "reporter", "page", "court"],
      limitations: [
        "Readable helper only; choose Supreme Court neutral citation, SCC-style, or AIR-style for narrower Indian judgment rules.",
        "Reporter-specific editorial requirements still require manual verification."
      ]
    },
    "scc:judgment": {
      id: "scc-law-report-judgment-scoped-v1",
      status: "scoped-reporter-helper",
      authorityFamily: "Supreme Court Cases / Indian law-report citation practice",
      confidence: "medium-for-core-components-low-for-editorial-edge-cases",
      required: ["title", "year", "volume", "page"],
      recommended: ["reporter"],
      limitations: [
        "Formats the common core SCC law-report pattern only: case name, (year) volume SCC first page.",
        "Does not verify party names, parallel citations, pinpoint references, supplement reports, or editorial variants."
      ]
    },
    "air:judgment": {
      id: "air-law-report-judgment-scoped-v1",
      status: "scoped-reporter-helper",
      authorityFamily: "All India Reporter / Indian law-report citation practice",
      confidence: "medium-for-core-components-low-for-editorial-edge-cases",
      required: ["title", "year", "court", "page"],
      recommended: [],
      limitations: [
        "Formats the common core AIR pattern only: case name, AIR year court abbreviation first page.",
        "Does not verify parallel citations, regional reporter variations, party names, or pinpoint references."
      ]
    },
    "oscola:judgment": {
      id: "oscola-uk-case-scoped-v1",
      status: "verified-scoped-rule",
      authorityFamily: "Oxford Law Faculty OSCOLA quick reference / OSCOLA 4th edition",
      confidence: "high-for-field-order-medium-for-user-entered-neutral-and-report-data",
      required: ["title"],
      recommended: ["year", "reporter", "page"],
      limitations: [
        "Covers only a scoped OSCOLA UK case pattern: party names, optional neutral citation, optional law report, optional court for cases without neutral citation, and optional paragraph pinpoint.",
        "Use the Court / neutral citation field for a UK neutral citation such as [2008] UKHL 13. If no neutral citation exists, use it for court information such as HL or CA.",
        "CiteJury does not verify that the neutral citation, law report, or party names match the real case."
      ]
    },
    "oscola:legislation": {
      id: "oscola-uk-legislation-scoped-v1",
      status: "verified-scoped-rule",
      authorityFamily: "Oxford Law Faculty OSCOLA quick reference / OSCOLA 4th edition",
      confidence: "medium-for-basic-act-and-section-pattern",
      required: ["title", "year"],
      recommended: ["page"],
      limitations: [
        "Covers only basic UK Act/instrument title + year + optional section/provision formatting.",
        "Does not cover statutory instruments, devolved legislation, EU materials, or complex amendment history."
      ]
    },
    "oscola:book": {
      id: "oscola-book-scoped-v1",
      status: "verified-scoped-rule",
      authorityFamily: "Oxford Law Faculty OSCOLA quick reference / OSCOLA 4th edition",
      confidence: "medium-for-basic-book-pattern",
      required: ["title", "reporter", "year"],
      recommended: ["page"],
      limitations: [
        "Uses the current field model: Title field must contain author + title as the user wants it displayed; Reporter / publisher contains publisher, edition if needed, and other publication details.",
        "Does not yet separately model author, editor, edition, place, chapter, or bibliography rearrangement."
      ]
    },
    "oscola:journal": {
      id: "oscola-journal-article-scoped-v1",
      status: "verified-scoped-rule",
      authorityFamily: "Oxford Law Faculty OSCOLA quick reference / OSCOLA 4th edition",
      confidence: "medium-for-basic-article-pattern",
      required: ["title", "year", "reporter", "page"],
      recommended: [],
      limitations: [
        "Uses the current field model: Title field must contain author + article title as the user wants it displayed; Reporter contains volume/issue and journal abbreviation/name.",
        "Does not yet separately model author, article title, volume, issue, journal, first page, pinpoint, DOI, or bibliography behavior."
      ]
    },
    "aglc:judgment": {
      id: "aglc-australian-case-provisional-v1",
      status: "authority-registered-not-public-default",
      authorityFamily: "Australian Guide to Legal Citation 4th edition",
      confidence: "low-until-dedicated-aglc-field-model",
      required: ["title"],
      recommended: ["year", "reporter", "page", "court"],
      limitations: [
        "Authority is registered for future expansion, but CiteJury does not yet expose a dedicated AGLC public style in the homepage form.",
        "Do not rely on generic output for formal Australian citation until a dedicated AGLC rule and browser corpus are added."
      ]
    },
    "bluebook:judgment": {
      id: "bluebook-us-case-provisional-v1",
      status: "authority-registered-not-public-default",
      authorityFamily: "The Bluebook: A Uniform System of Citation",
      confidence: "low-until-dedicated-bluebook-field-model",
      required: ["title"],
      recommended: ["volume", "reporter", "page", "court", "year"],
      limitations: [
        "Authority is registered for future expansion, but CiteJury does not yet expose a dedicated Bluebook public style in the homepage form.",
        "The Bluebook is commercially published and highly detailed; CiteJury must add a dedicated field model and tests before claiming support."
      ]
    },
    "default": {
      id: "generic-source-readable-v1",
      status: "provisional-helper",
      authorityFamily: "General citation practice; source-specific verification required",
      confidence: "low",
      required: ["title"],
      recommended: ["year"],
      limitations: [
        "Generic source output is formatting assistance only and requires manual verification."
      ]
    }
  };

  const getRuleSpec = (data) => ruleSpecs[`${data.citationStyle}:${data.sourceType}`] || ruleSpecs.default;
  const getMissingRequired = (data, spec) => (spec.required || []).filter((field) => !data[field]);
  const getMissingRecommended = (data, spec) => (spec.recommended || []).filter((field) => !data[field]);

  const helpers = {
    join(values, separator = " ") {
      return values.filter(Boolean).join(separator).replace(/\s+/g, " ").trim();
    },
    finish(text) {
      const value = String(text || "").replace(/\s+/g, " ").trim();
      if (!value) return "";
      return /[.!?]$/.test(value) ? value : `${value}.`;
    },
    styleLabel(style) {
      return {
        "indian-legal": "Indian Legal",
        "scc": "SCC-style",
        "air": "AIR-style",
        "oscola": "OSCOLA",
        "aglc": "AGLC-scoped",
        "bluebook": "Bluebook-scoped"
      }[style] || "Indian Legal";
    },
    neutralToken(data) {
      return `${data.year}INSC${data.page}`;
    },
    looksLikeUkNeutral(value) {
      return /^\[\d{4}\]\s+(UKSC|UKHL|EWCA\s+Civ|EWCA\s+Crim|EWHC|UKPC|UKUT|EWFC)\s+\d+[A-Za-z]?/i.test(clean(value));
    },
    oscolaReporter(data) {
      if (!data.reporter && !data.page) return "";
      const year = data.year ? `[${data.year}]` : "";
      return helpers.join([year, data.volume, data.reporter, data.page]);
    },
    oscolaPinpoint(data) {
      return data.volume && /^para(graph)?\s+/i.test(data.volume) ? `[${data.volume.replace(/^para(graph)?\s+/i, "")}]` : "";
    }
  };

  const styleTransforms = {
    "indian-legal": {
      apply(base) { return base; },
      note: "Indian Legal now prioritises narrow, explainable Indian judgment rules where supported."
    },
    "scc": {
      apply(base, data) {
        if (data.sourceType !== "judgment") return base;
        return helpers.finish(helpers.join([
          data.title,
          helpers.join([`(${data.year})`, data.volume, "SCC", data.page])
        ], ", "));
      },
      note: "SCC-style output is limited to the common core law-report pattern: case name, year, volume, SCC, and first page."
    },
    "air": {
      apply(base, data) {
        if (data.sourceType !== "judgment") return base;
        return helpers.finish(helpers.join([
          data.title,
          helpers.join(["AIR", data.year, data.court.toUpperCase(), data.page])
        ], ", "));
      },
      note: "AIR-style output is limited to the common core law-report pattern: case name, AIR, year, court abbreviation, and first page."
    },
    "oscola": {
      apply(base, data) {
        if (data.sourceType === "judgment") {
          const neutralOrCourt = data.court;
          const neutral = helpers.looksLikeUkNeutral(neutralOrCourt) ? neutralOrCourt : "";
          const court = neutral ? "" : neutralOrCourt;
          const report = helpers.oscolaReporter(data);
          const pinpoint = helpers.oscolaPinpoint(data);
          const suffix = court && !neutral ? ` (${court})` : "";
          return helpers.finish(helpers.join([data.title || "Untitled case", neutral, report, pinpoint]) + suffix);
        }
        if (data.sourceType === "legislation") {
          return helpers.finish(helpers.join([data.title, data.year, data.page ? `s ${data.page}` : ""]));
        }
        if (data.sourceType === "book") {
          return helpers.finish(`${data.title}${data.reporter || data.year ? ` (${helpers.join([data.reporter, data.year], ", ")})` : ""}${data.page ? ` ${data.page}` : ""}`);
        }
        if (data.sourceType === "journal") {
          return helpers.finish(helpers.join([data.title, data.year ? `[${data.year}]` : "", data.reporter, data.page]));
        }
        return base;
      },
      note: "OSCOLA output is now scoped to verified UK case ordering and basic legislation/book/journal patterns from Oxford OSCOLA sources."
    }
  };

  const rules = {
    "sc-neutral-judgment"(data) {
      const token = helpers.neutralToken(data);
      return {
        citation: helpers.finish(helpers.join([data.title, token], ", ")),
        explanation: "Supreme Court of India neutral citations use a court-issued publisher-neutral token made from year, INSC, and a sequence number.",
        parts: [
          `Case name: ${data.title}`,
          `Neutral citation token: ${token}`,
          `Year: ${data.year}`,
          "Court code: INSC",
          `Sequence number: ${data.page}`,
          "Scope: Supreme Court of India judgments/orders only"
        ]
      };
    },

    judgment(data) {
      const year = data.year ? `(${data.year})` : "";
      const reporter = helpers.join([data.volume, data.reporter, data.page]);
      const court = data.court ? `, ${data.court}` : "";
      const citation = helpers.finish(helpers.join([
        data.title || "Untitled case",
        helpers.join([year, reporter])
      ], ", ") + court);

      return {
        citation,
        explanation: "Judgment citations generally start with the case name, followed by year, volume, reporter, page, and court where available.",
        parts: [
          `Case name: ${data.title || "missing"}`,
          data.year ? `Year: ${data.year}` : "Year: not supplied",
          data.volume ? `Volume: ${data.volume}` : "Volume: not supplied",
          data.reporter ? `Reporter: ${data.reporter}` : "Reporter: not supplied",
          data.page ? `Page/reference: ${data.page}` : "Page/reference: not supplied",
          data.court ? `Court: ${data.court}` : "Court: not supplied"
        ]
      };
    },

    legislation(data) {
      const citation = helpers.finish(helpers.join([
        data.title || "Untitled legislation",
        data.year,
        data.page ? `s. ${data.page}` : ""
      ], ", "));

      return {
        citation,
        explanation: "Legislation citations identify the Act or instrument, year, and section or provision where supplied.",
        parts: [
          `Instrument: ${data.title || "missing"}`,
          data.year ? `Year: ${data.year}` : "Year: not supplied",
          data.page ? `Section/provision: ${data.page}` : "Section/provision: not supplied"
        ]
      };
    },

    constitution(data) {
      const citation = helpers.finish(helpers.join([
        data.title || "Constitution of India",
        data.page ? `art. ${data.page}` : ""
      ], ", "));

      return {
        citation,
        explanation: "Constitution citations identify the constitutional instrument and relevant article or provision.",
        parts: [
          `Instrument: ${data.title || "Constitution of India"}`,
          data.page ? `Article/provision: ${data.page}` : "Article/provision: not supplied"
        ]
      };
    },

    book(data) {
      const citation = helpers.finish(
        `${data.title || "Untitled book"}${data.reporter ? `, ${data.reporter}` : ""}${data.year ? ` (${data.year})` : ""}${data.page ? `, ${data.page}` : ""}`
      );

      return {
        citation,
        explanation: "Book citations use title, publisher, year, and pinpoint page where available.",
        parts: [
          `Title: ${data.title || "missing"}`,
          data.reporter ? `Publisher: ${data.reporter}` : "Publisher: not supplied",
          data.year ? `Year: ${data.year}` : "Year: not supplied",
          data.page ? `Pinpoint: ${data.page}` : "Pinpoint: not supplied"
        ]
      };
    },

    journal(data) {
      const citation = helpers.finish(helpers.join([
        data.title || "Untitled article",
        data.year ? `(${data.year})` : "",
        data.reporter,
        data.page
      ]));

      return {
        citation,
        explanation: "Journal citations identify article title, year, journal name, and page reference where available.",
        parts: [
          `Article title: ${data.title || "missing"}`,
          data.year ? `Year: ${data.year}` : "Year: not supplied",
          data.reporter ? `Journal: ${data.reporter}` : "Journal: not supplied",
          data.page ? `Page: ${data.page}` : "Page: not supplied"
        ]
      };
    },

    website(data) {
      const citation = helpers.finish(
        `${data.title || "Untitled web source"}${data.reporter ? `, ${data.reporter}` : ""}${data.year ? ` (${data.year})` : ""}${data.page ? `, ${data.page}` : ""}`
      );

      return {
        citation,
        explanation: "Website citations identify page title, website or institution, year when available, and URL or reference.",
        parts: [
          `Page title: ${data.title || "missing"}`,
          data.reporter ? `Website/institution: ${data.reporter}` : "Website/institution: not supplied",
          data.year ? `Year: ${data.year}` : "Year: not supplied",
          data.page ? `URL/reference: ${data.page}` : "URL/reference: not supplied"
        ]
      };
    }
  };

  const validate = (rawData) => {
    const data = normalize(rawData);
    const spec = getRuleSpec(data);
    const missingRequired = getMissingRequired(data, spec);

    if (missingRequired.length) {
      const labels = missingRequired.map((field) => field === "page" && data.sourceType === "sc-neutral-judgment" ? "sequence number" : field);
      return `Required field missing for this citation rule: ${labels.join(", ")}.`;
    }

    if (!data.title) return "Please enter a case or source title.";
    if (data.year && !/^\d{4}$/.test(data.year)) return "Year should be a 4-digit value, for example 2017.";

    if (data.sourceType === "sc-neutral-judgment") {
      if (!digitsOnly(data.page)) return "Supreme Court neutral citation sequence number should contain digits only, for example 1 or 785.";
      if (data.court && !/^(supreme court of india|sc|sci)$/i.test(data.court)) {
        return "Supreme Court neutral citation support is currently scoped only to the Supreme Court of India.";
      }
    }

    if (data.citationStyle === "scc" && data.sourceType === "judgment") {
      if (!digitsOnly(data.volume)) return "SCC-style judgment citations require a numeric volume, for example 10.";
      if (!digitsOnly(data.page)) return "SCC-style judgment citations require a numeric first page, for example 1.";
    }

    if (data.citationStyle === "air" && data.sourceType === "judgment") {
      if (!digitsOnly(data.page)) return "AIR-style judgment citations require a numeric first page, for example 27.";
      if (!/^[A-Za-z]{2,12}$/.test(data.court)) return "AIR-style judgment citations require a court abbreviation, for example SC, Bom, Del, Cal, Mad, All, Ker, or Kant.";
    }

    if (data.citationStyle === "oscola" && data.sourceType === "judgment") {
      if (data.court && /^\d{4}\s+(UKSC|UKHL|EWCA|EWHC|UKPC)/i.test(data.court)) {
        return "For OSCOLA neutral citations, include square brackets around the neutral citation year, for example [2008] UKHL 13.";
      }
      if (data.reporter && !data.page) return "OSCOLA case citations with a law report should include the first page.";
    }

    if (data.citationStyle === "oscola" && data.sourceType === "legislation" && !data.year) {
      return "OSCOLA legislation citations require the legislation year.";
    }

    if (data.citationStyle === "oscola" && ["book", "journal"].includes(data.sourceType) && !data.reporter) {
      return "OSCOLA book and journal helpers require publisher or journal details in the Reporter / publisher / website field.";
    }

    if (data.sourceType === "website" && data.page && !/^https?:\/\//i.test(data.page)) {
      return "For website citations, enter a full URL starting with http:// or https://.";
    }
    return "";
  };

  const generate = (input) => {
    const data = normalize(input);
    const error = validate(data);

    if (error) {
      return { ok: false, error, citation: "", explanation: "", parts: [] };
    }

    const rule = rules[data.sourceType] || rules.judgment;
    const base = rule(data);
    const transformer = data.sourceType === "sc-neutral-judgment" ? styleTransforms["indian-legal"] : (styleTransforms[data.citationStyle] || styleTransforms["indian-legal"]);
    const citation = transformer.apply(base.citation, data);
    const spec = getRuleSpec(data);
    const missingRequired = getMissingRequired(data, spec);
    const missingRecommended = getMissingRecommended(data, spec);

    return {
      ok: true,
      sourceType: data.sourceType,
      citationStyle: data.sourceType === "sc-neutral-judgment" ? "indian-legal" : data.citationStyle,
      rule: {
        id: spec.id,
        status: spec.status,
        authorityFamily: spec.authorityFamily,
        confidence: spec.confidence,
        missingRequired,
        missingRecommended,
        limitations: spec.limitations
      },
      citation,
      explanation: `${base.explanation} Style note: ${transformer.note}`,
      parts: [
        `Style: ${helpers.styleLabel(data.sourceType === "sc-neutral-judgment" ? "indian-legal" : data.citationStyle)}`,
        `Rule: ${spec.id}`,
        `Rule status: ${spec.status}`,
        `Authority family: ${spec.authorityFamily}`,
        `Confidence: ${spec.confidence}`,
        missingRecommended.length ? `Recommended fields missing: ${missingRecommended.join(", ")}` : "Recommended fields supplied: yes",
        ...base.parts
      ],
      verification: {
        required: true,
        message: "Verify this citation against the original source and the rules required for your formal use.",
        limitations: spec.limitations
      }
    };
  };

  window.CiteJuryCitationEngine = Object.freeze({
    generate,
    validate,
    normalize,
    sourceTypes: Object.freeze(Object.keys(rules)),
    citationStyles: Object.freeze(Object.keys(styleTransforms)),
    ruleSpecs: Object.freeze(ruleSpecs)
  });
})();
