
window.CiteJuryTrustValidation = window.CiteJuryTrustValidation || {
  currentYear: new Date().getFullYear(),
  plausibleYear(value) {
    const y = Number(String(value || "").trim());
    return Number.isInteger(y) && y >= 1800 && y <= this.currentYear;
  },
  positiveNumber(value, max = 100000) {
    const v = String(value || "").trim();
    return /^[1-9]\d*$/.test(v) && Number(v) <= max;
  },
  normalizeProvision(value, type = "section") {
    const v = String(value || "").trim();
    const r = type === "article"
      ? /^(?:article|art\.?)\s*/i
      : /^(?:section|sec\.?|s\.?)\s*/i;
    return v.replace(r, "");
  }
};
