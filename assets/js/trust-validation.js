window.CiteJuryTrustValidation = window.CiteJuryTrustValidation || (() => {
  const clean = (value) => String(value || "").trim();
  const knownAirCourts = new Set(["SC", "BOM", "CAL", "DEL", "MAD", "ALL", "AP", "KANT", "KER", "MP", "PAT", "RAJ", "GUJ", "ORI", "PH", "P&H", "GAU", "JK", "J&K", "HP", "UTR", "UTT", "CHH", "JHAR", "TRI", "MEG", "SIK", "MAN", "NAG"]);
  const reservedAirCourtTokens = new Set(["AIR", "SCC", "INSC", "SCR"]);

  return {
    currentYear: new Date().getFullYear(),
    clean,
    plausibleYear(value) {
      const year = Number(clean(value));
      return Number.isInteger(year) && year >= 1800 && year <= this.currentYear;
    },
    isPlausibleYear(value) {
      return this.plausibleYear(value);
    },
    positiveNumber(value, max = 100000) {
      const text = clean(value);
      if (!/^[1-9]\d*$/.test(text)) return false;
      const number = Number(text);
      return Number.isInteger(number) && number > 0 && number <= max;
    },
    isPositiveInteger(value, max = 100000) {
      return this.positiveNumber(value, max);
    },
    invalidConfidenceCap() {
      return 50;
    },
    normalizeProvision(value, type = "section") {
      const text = clean(value).replace(/\s+/g, " ");
      const prefix = type === "article"
        ? /^(?:article|art\.?)\s*/i
        : /^(?:section|sec\.?|s\.?)\s*/i;
      return text.replace(prefix, "").trim();
    },
    airCourtToken(value) {
      return clean(value).replace(/\./g, "").toUpperCase();
    },
    assessAirCourt(value) {
      const token = this.airCourtToken(value);
      if (!token || reservedAirCourtTokens.has(token)) return { ok: false, known: false, token };
      return { ok: true, known: knownAirCourts.has(token), token };
    }
  };
})();
