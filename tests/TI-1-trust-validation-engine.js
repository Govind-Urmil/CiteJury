(function () {
  const results = [];
  const output = document.querySelector("#results");
  const pass = (name, ok, detail) => {
    results.push(`${ok ? "PASS" : "FAIL"}: ${name}${detail ? " - " + detail : ""}`);
  };

  const trust = window.CiteJuryTrustValidation;
  const engine = window.CiteJuryCitationEngine;

  pass("trust validation loaded", Boolean(trust));
  pass("engine loaded", Boolean(engine));

  if (trust) {
    pass("future year blocked", !trust.plausibleYear("2099"));
    pass("zero year blocked", !trust.plausibleYear("0000"));
  }

  if (engine && typeof engine.generate === "function") {
    const future = engine.generate({
      citationStyle: "scc",
      sourceType: "judgment",
      title: "Case",
      year: "2099",
      volume: "10",
      reporter: "SCC",
      page: "1",
      court: ""
    });
    pass("generator rejects future SCC year", !future.ok, future.citation || future.error || "");

    const zero = engine.generate({
      citationStyle: "scc",
      sourceType: "judgment",
      title: "Case",
      year: "2017",
      volume: "0",
      reporter: "SCC",
      page: "0",
      court: ""
    });
    pass("generator rejects zero SCC volume/page", !zero.ok, zero.citation || zero.error || "");

    const airBad = engine.generate({
      citationStyle: "air",
      sourceType: "judgment",
      title: "Case",
      year: "1978",
      volume: "",
      reporter: "AIR",
      court: "SCC",
      page: "597"
    });
    pass("generator rejects AIR court reporter token", !airBad.ok, airBad.citation || airBad.error || "");

    const section = engine.generate({
      citationStyle: "indian-legal",
      sourceType: "legislation",
      title: "Information Technology Act",
      year: "2000",
      page: "section 66A",
      reporter: "",
      volume: "",
      court: ""
    });
    pass("section prefix normalizes", section.ok && /s\. 66A/.test(section.citation) && !/ection/.test(section.citation), section.citation || section.error || "");

    const article = engine.generate({
      citationStyle: "indian-legal",
      sourceType: "constitution",
      title: "Constitution of India",
      year: "",
      page: "Article 21",
      reporter: "",
      volume: "",
      court: "India"
    });
    pass("article prefix normalizes", article.ok && /art\. 21/.test(article.citation) && !/icle/.test(article.citation), article.citation || article.error || "");

    const journal = engine.generate({
      citationStyle: "oscola",
      sourceType: "journal",
      title: "Privacy and the Constitution",
      year: "2021",
      volume: "12",
      reporter: "Indian Law Review",
      page: "45",
      court: ""
    });
    pass(
      "OSCOLA journal includes volume",
      journal.ok && journal.citation === "Privacy and the Constitution [2021] 12 Indian Law Review 45.",
      journal.citation || journal.error || ""
    );
  }

  pass(
    "asset refs use 082b",
    document.documentElement.outerHTML.includes("?v=082b") &&
      !/\?v=(072|073|073a|073b|074|075|075a|076|077|078|079|080|081|082|082a|082c)\b/.test(document.documentElement.outerHTML)
  );

  output.textContent = results.join("\n");
  document.documentElement.dataset.testStatus = results.some((line) => line.startsWith("FAIL")) ? "fail" : "pass";
})();
