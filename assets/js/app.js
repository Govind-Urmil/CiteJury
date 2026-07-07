(() => {
  "use strict";

  const app = {
    name: "CiteJury",
    ep: "EP-005",
    init() {
      document.documentElement.classList.add("js-enabled");
      this.bindInternalLinks();
    },
    bindInternalLinks() {
      document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", () => {
          document.documentElement.classList.add("has-used-navigation");
        });
      });
    }
  };

  document.addEventListener("DOMContentLoaded", () => app.init());
})();
