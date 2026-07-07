(() => {
  "use strict";

  const citationRules = {
    judgment: {
      label: "Judgment",
      required: ["title"],
      format(data) {
        const title = data.title || "Untitled case";
        const year = data.year ? `(${data.year})` : "";
        const reporter = [data.volume, data.reporter, data.page].filter(Boolean).join(" ");
        return [title, [year, reporter].filter(Boolean).join(" ")].filter(Boolean).join(", ") + ".";
      },
      explain(data) {
        return {
          summary: "Judgment citations begin with the case name, then use year, volume, reporter abbreviation, and first page when available.",
          parts: [
            `Case/source title: ${data.title || "missing"}`,
            data.year ? `Year: ${data.year}` : "Year: not supplied",
            data.reporter ? `Reporter: ${data.reporter}` : "Reporter: not supplied",
            data.page ? `Page/reference: ${data.page}` : "Page/reference: not supplied"
          ]
        };
      }
    },
    legislation: {
      label: "Legislation",
      required: ["title"],
      format(data) {
        const year = data.year ? `, ${data.year}` : "";
        const section = data.page ? `, s. ${data.page}` : "";
        return `${data.title || "Untitled legislation"}${year}${section}.`;
      },
      explain(data) {
        return {
          summary: "Legislation citations identify the Act or instrument, year, and relevant section or provision where supplied.",
          parts: [
            `Instrument: ${data.title || "missing"}`,
            data.year ? `Year: ${data.year}` : "Year: not supplied",
            data.page ? `Provision/section: ${data.page}` : "Provision/section: not supplied"
          ]
        };
      }
    },
    constitution: {
      label: "Constitution",
      required: ["title"],
      format(data) {
        const article = data.page ? `, art. ${data.page}` : "";
        return `${data.title || "Constitution of India"}${article}.`;
      },
      explain(data) {
        return {
          summary: "Constitution citations identify the constitutional instrument and relevant article or provision.",
          parts: [
            `Instrument: ${data.title || "Constitution of India"}`,
            data.page ? `Article/provision: ${data.page}` : "Article/provision: not supplied"
          ]
        };
      }
    },
    book: {
      label: "Book",
      required: ["title"],
      format(data) {
        const publisher = data.reporter ? `, ${data.reporter}` : "";
        const year = data.year ? ` (${data.year})` : "";
        const page = data.page ? `, ${data.page}` : "";
        return `${data.title || "Untitled book"}${publisher}${year}${page}.`;
      },
      explain(data) {
        return {
          summary: "Book citations use title, publisher, year, and pinpoint page where available.",
          parts: [
            `Title: ${data.title || "missing"}`,
            data.reporter ? `Publisher: ${data.reporter}` : "Publisher: not supplied",
            data.page ? `Pinpoint page: ${data.page}` : "Pinpoint page: not supplied"
          ]
        };
      }
    },
    journal: {
      label: "Journal article",
      required: ["title"],
      format(data) {
        const year = data.year ? ` (${data.year})` : "";
        const journal = data.reporter ? ` ${data.reporter}` : "";
        const page = data.page ? ` ${data.page}` : "";
        return `${data.title || "Untitled article"}${year}${journal}${page}.`;
      },
      explain(data) {
        return {
          summary: "Journal citations identify article title, year, journal name, and page reference where available.",
          parts: [
            `Article title: ${data.title || "missing"}`,
            data.reporter ? `Journal: ${data.reporter}` : "Journal: not supplied",
            data.page ? `Page: ${data.page}` : "Page: not supplied"
          ]
        };
      }
    },
    website: {
      label: "Website",
      required: ["title"],
      format(data) {
        const site = data.reporter ? `, ${data.reporter}` : "";
        const url = data.page ? `, ${data.page}` : "";
        const year = data.year ? ` (${data.year})` : "";
        return `${data.title || "Untitled web source"}${site}${year}${url}.`;
      },
      explain(data) {
        return {
          summary: "Website citations identify page title, site or institution, year when available, and URL.",
          parts: [
            `Page title: ${data.title || "missing"}`,
            data.reporter ? `Website/institution: ${data.reporter}` : "Website/institution: not supplied",
            data.page ? `URL/reference: ${data.page}` : "URL/reference: not supplied"
          ]
        };
      }
    }
  };

  const clean = (value) => String(value || "").trim();

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
  const error = document.querySelector("#form-error");
  const copy = document.querySelector("#copy-citation");
  const download = document.querySelector("#download-citation");

  const getData = (fd) => ({
    citationStyle: clean(fd.get("citationStyle")),
    sourceType: clean(fd.get("sourceType")),
    title: clean(fd.get("title")),
    year: clean(fd.get("year")),
    reporter: clean(fd.get("reporter")),
    volume: clean(fd.get("volume")),
    page: clean(fd.get("page")),
    court: clean(fd.get("court"))
  });

  const validate = (data) => {
    if (!data.title) return "Please enter a case or source title.";
    if (data.year && !/^\d{4}$/.test(data.year)) return "Year should be a 4-digit value, for example 2017.";
    return "";
  };

  const renderParts = (items) => {
    if (!parts) return;
    parts.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      parts.appendChild(li);
    });
  };

  const resetPreview = () => {
    if (error) {
      error.hidden = true;
      error.textContent = "";
    }
    if (output) output.textContent = "Your citation will appear here.";
    if (explain) explain.textContent = "Fill the form and generate a citation to see the explanation.";
    if (parts) parts.innerHTML = "";
  };

  if (form && output && explain && error) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = getData(new FormData(form));
      const message = validate(data);

      if (message) {
        error.hidden = false;
        error.textContent = message;
        output.textContent = "Your citation will appear here.";
        explain.textContent = "Fix the highlighted issue and generate again.";
        renderParts([]);
        return;
      }

      const rule = citationRules[data.sourceType] || citationRules.judgment;
      const detail = rule.explain(data);

      error.hidden = true;
      error.textContent = "";
      output.textContent = rule.format(data).replace(/\s+/g, " ");
      explain.textContent = detail.summary;
      renderParts(detail.parts);
    });

    form.addEventListener("reset", () => setTimeout(resetPreview, 0));
  }

  if (copy && output) {
    copy.addEventListener("click", async () => {
      const text = output.textContent.trim();
      if (!text || text === "Your citation will appear here.") return;
      try {
        await navigator.clipboard.writeText(text);
        copy.textContent = "Copied";
      } catch {
        copy.textContent = "Copy failed";
      }
      setTimeout(() => { copy.textContent = "Copy citation"; }, 1400);
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
})();
