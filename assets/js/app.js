(() => {
  "use strict";

  const rules = {
    judgment(data) {
      const title = data.title || "Untitled case";
      const year = data.year ? `(${data.year})` : "";
      const reporter = [data.volume, data.reporter, data.page].filter(Boolean).join(" ");
      return {
        citation: [title, [year, reporter].filter(Boolean).join(" ")].filter(Boolean).join(", ") + ".",
        explanation: "Judgment citations generally begin with the case name, followed by the year, volume, reporter abbreviation, and first page where available."
      };
    },
    legislation(data) {
      const title = data.title || "Untitled legislation";
      const year = data.year ? `, ${data.year}` : "";
      const section = data.page ? `, s. ${data.page}` : "";
      return {
        citation: `${title}${year}${section}.`,
        explanation: "Legislation citations identify the Act or instrument, year, and relevant section or provision where supplied."
      };
    },
    book(data) {
      const title = data.title || "Untitled book";
      const publisher = data.reporter ? `, ${data.reporter}` : "";
      const year = data.year ? ` (${data.year})` : "";
      const page = data.page ? `, ${data.page}` : "";
      return {
        citation: `${title}${publisher}${year}${page}.`,
        explanation: "Book citations usually include title, publisher, year, and pinpoint page where available."
      };
    },
    journal(data) {
      const title = data.title || "Untitled article";
      const year = data.year ? ` (${data.year})` : "";
      const journal = data.reporter ? ` ${data.reporter}` : "";
      const page = data.page ? ` ${data.page}` : "";
      return {
        citation: `${title}${year}${journal}${page}.`,
        explanation: "Journal citations identify article title, year, journal name, and page reference where available."
      };
    },
    website(data) {
      const title = data.title || "Untitled web source";
      const site = data.reporter ? `, ${data.reporter}` : "";
      const url = data.page ? `, ${data.page}` : "";
      const year = data.year ? ` (${data.year})` : "";
      return {
        citation: `${title}${site}${year}${url}.`,
        explanation: "Website citations identify page title, site or institution, year when available, and URL."
      };
    }
  };

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
  const copy = document.querySelector("#copy-citation");

  const clean = (value) => String(value || "").trim();

  if (form && output && explain) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const data = {
        sourceType: clean(formData.get("sourceType")),
        title: clean(formData.get("title")),
        year: clean(formData.get("year")),
        reporter: clean(formData.get("reporter")),
        volume: clean(formData.get("volume")),
        page: clean(formData.get("page"))
      };
      const formatter = rules[data.sourceType] || rules.judgment;
      const result = formatter(data);
      output.textContent = result.citation.replace(/\s+/g, " ");
      explain.textContent = result.explanation;
    });

    form.addEventListener("reset", () => {
      setTimeout(() => {
        output.textContent = "Your citation will appear here.";
        explain.textContent = "Fill the form and generate a citation to see the explanation.";
      }, 0);
    });
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
})();
