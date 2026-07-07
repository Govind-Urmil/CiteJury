/*
  CiteJury Citation Engine
  EP-019
  Browser-first, static-site compatible, no backend dependency.
*/

(() => {
  "use strict";

  const clean = (value) => String(value || "").trim();

  const normalize = (data = {}) => ({
    citationStyle: clean(data.citationStyle || "indian-legal"),
    sourceType: clean(data.sourceType || "judgment"),
    title: clean(data.title),
    year: clean(data.year),
    reporter: clean(data.reporter),
    volume: clean(data.volume),
    page: clean(data.page),
    court: clean(data.court)
  });

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
        "oscola": "OSCOLA-like"
      }[style] || "Indian Legal";
    }
  };

  const styleTransforms = {
    "indian-legal": {
      apply(base) { return base; },
      note: "Indian Legal keeps citation components readable and practical for Indian legal writing."
    },
    "scc": {
      apply(base, data) {
        if (data.sourceType !== "judgment") return base;
        const year = data.year ? `(${data.year})` : "";
        const reporter = data.reporter || "SCC";
        return helpers.finish(helpers.join([data.title || "Untitled case", helpers.join([year, data.volume, reporter, data.page])], ", "));
      },
      note: "SCC-style prioritises year, volume, SCC reporter abbreviation, and first page for judgments."
    },
    "air": {
      apply(base, data) {
        if (data.sourceType !== "judgment") return base;
        const court = data.court || "SC";
        return helpers.finish(helpers.join([data.title || "Untitled case", helpers.join(["AIR", data.year, court, data.page])], ", "));
      },
      note: "AIR-style commonly uses AIR, year, court abbreviation, and page for judgments."
    },
    "oscola": {
      apply(base, data) {
        if (data.sourceType === "judgment") {
          return helpers.finish(helpers.join([data.title || "Untitled case", data.year ? `[${data.year}]` : "", data.reporter, data.page]));
        }
        return base;
      },
      note: "OSCOLA-like output uses a bracketed year style for judgments where supplied."
    }
  };

  const rules = {
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

  const validate = (data) => {
    if (!data.title) return "Please enter a case or source title.";
    if (data.year && !/^\d{4}$/.test(data.year)) return "Year should be a 4-digit value, for example 2017.";
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
    const transformer = styleTransforms[data.citationStyle] || styleTransforms["indian-legal"];
    const citation = transformer.apply(base.citation, data);

    return {
      ok: true,
      sourceType: data.sourceType,
      citationStyle: data.citationStyle,
      citation,
      explanation: `${base.explanation} Style note: ${transformer.note}`,
      parts: [`Style: ${helpers.styleLabel(data.citationStyle)}`, ...base.parts],
      verification: {
        required: true,
        message: "Verify this citation against the original source and the rules required for your formal use."
      }
    };
  };

  window.CiteJuryCitationEngine = Object.freeze({
    generate,
    validate,
    normalize,
    sourceTypes: Object.freeze(Object.keys(rules)),
    citationStyles: Object.freeze(Object.keys(styleTransforms))
  });
})();
