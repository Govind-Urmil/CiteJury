(function () {
  const result = document.querySelector("#result");
  const lines = [];
  const pass = (name, ok, detail) => {
    lines.push(`${ok ? "PASS" : "FAIL"}: ${name}${detail ? " - " + detail : ""}`);
  };

  const trust = window.CiteJuryTrustValidation;
  const engine = window.CiteJuryCitationEngine;

  pass("trust validation loaded", Boolean(trust));
  pass("citation engine loaded", Boolean(engine));

  if (trust) {
    pass("future year blocked", !trust.plausibleYear("2099"));
    pass("zero year blocked", !trust.plausibleYear("0000"));
  }

  if (engine && typeof engine.generate === "function") {
    const journal = engine.generate({
      citationStyle: "oscola",
      sourceType: "journal",
      title: "Privacy and the Constitution",
      year: "2021",
      volume: "12",
      reporter: "Indian Law Review",
      page: "45"
    });
    pass(
      "OSCOLA journal volume retained",
      journal.ok && journal.citation === "Privacy and the Constitution [2021] 12 Indian Law Review 45.",
      journal.citation || journal.error || ""
    );
  }

  result.textContent = lines.join("\n");
  document.documentElement.dataset.testStatus = lines.some((line) => line.startsWith("FAIL")) ? "fail" : "pass";
})();
