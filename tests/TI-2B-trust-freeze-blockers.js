(function () {
  const results = document.querySelector("#results");
  const pass = [];
  const fail = [];
  const assert = (condition, label, detail) => {
    (condition ? pass : fail).push(`${label}${detail ? " - " + detail : ""}`);
  };

  const trust = window.CiteJuryTrustValidation;
  const engine = window.CiteJuryCitationEngine;

  assert(Boolean(trust), "trust validation loaded");
  assert(Boolean(engine), "citation engine loaded");

  if (trust) {
    const isPlausibleYear = trust.isPlausibleYear || trust.plausibleYear;
    const isPositiveInteger = trust.isPositiveInteger || trust.positiveNumber || trust.plausiblePositiveNumber;
    const assessAirCourt = trust.assessAirCourt || trust.validateAirCourt;
    ["2099", "0000"].forEach((year) => {
      assert(typeof isPlausibleYear === "function" && !isPlausibleYear.call(trust, year), `${year} rejected by shared year validation`);
    });
    assert(typeof isPositiveInteger === "function" && !isPositiveInteger.call(trust, "0"), "zero rejected by shared numeric validation");
    assert(typeof isPositiveInteger === "function" && !isPositiveInteger.call(trust, "999999", 999), "extreme value rejected by shared numeric validation");
    const airCourt = typeof assessAirCourt === "function" ? assessAirCourt.call(trust, "SCC") : null;
    assert(airCourt && !airCourt.ok, "AIR court reporter token rejected");
  }

  if (engine && typeof engine.generate === "function") {
    [
      ["future SCC refused", { citationStyle: "scc", sourceType: "judgment", title: "Case", year: "2099", volume: "10", reporter: "SCC", page: "1" }],
      ["zero SCC refused", { citationStyle: "scc", sourceType: "judgment", title: "Case", year: "2017", volume: "0", reporter: "SCC", page: "1" }],
      ["extreme SCC refused", { citationStyle: "scc", sourceType: "judgment", title: "Case", year: "2017", volume: "999999", reporter: "SCC", page: "1" }],
      ["AIR reporter token refused", { citationStyle: "air", sourceType: "judgment", title: "Case", year: "1978", court: "SCC", page: "597" }],
      ["zero INSC refused", { citationStyle: "indian-legal", sourceType: "sc-neutral-judgment", title: "Case", year: "2017", page: "0" }]
    ].forEach(([label, data]) => {
      const generated = engine.generate(data);
      assert(!generated.ok, label, generated.citation || generated.error || "");
    });

    const provision = engine.generate({
      citationStyle: "indian-legal",
      sourceType: "legislation",
      title: "IT Act",
      year: "2000",
      page: "section 66A"
    });
    assert(provision.citation === "IT Act, 2000, s. 66A.", "provision prefix normalized", provision.citation || provision.error || "");

    const journalData = {
      citationStyle: "oscola",
      sourceType: "journal",
      title: "Privacy and the Constitution",
      year: "2021",
      volume: "12",
      reporter: "Indian Law Review",
      page: "45"
    };
    const journal = engine.generate(journalData);
    const alternatives = engine.generateStyleAlternatives(journalData);
    assert(journal.citation === "Privacy and the Constitution [2021] 12 Indian Law Review 45.", "OSCOLA journal output includes volume", journal.citation || journal.error || "");
    assert(journal.parts && journal.parts.some((part) => part === "Volume: 12"), "OSCOLA journal anatomy includes volume");
    assert(alternatives.some((item) => item.citation.includes("[2021] 12 Indian Law Review 45")), "OSCOLA journal alternative includes volume");
  }

  results.textContent = fail.length
    ? `FAIL\n${fail.join("\n")}\n\nPASS\n${pass.join("\n")}`
    : `PASS\n${pass.join("\n")}`;
  document.documentElement.dataset.testStatus = fail.length ? "fail" : "pass";
})();
