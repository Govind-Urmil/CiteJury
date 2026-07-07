(() => {
  "use strict";

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

  const resetPreview = () => {
    if (error) {
      error.hidden = true;
      error.textContent = "";
    }

    if (output) output.textContent = "Your citation will appear here.";
    if (explain) explain.textContent = "Fill the form and generate a citation to see the explanation.";
    renderParts([]);
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
        return;
      }

      error.hidden = true;
      error.textContent = "";
      output.textContent = result.citation;
      explain.textContent = result.explanation;
      renderParts(result.parts);
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
