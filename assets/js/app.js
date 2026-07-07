(() => {
  "use strict";

  const app = {
    name: "CiteJury",
    version: "EP-004",
    init() {
      document.documentElement.classList.add("js-enabled");
    }
  };

  document.addEventListener("DOMContentLoaded", () => app.init());
})();
