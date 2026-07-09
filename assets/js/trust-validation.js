window.CiteJuryTrustValidation = {
 currentYear: new Date().getFullYear(),
 plausibleYear(v){const y=Number(String(v||'').trim());return Number.isInteger(y)&&y>=1800&&y<=this.currentYear;},
 positiveNumber(v,max=100000){const s=String(v||'').trim();return /^[1-9]\\d*$/.test(s)&&Number(s)<=max;},
 invalidConfidenceCap(){return 50;},
 normalizeProvision(v,type='section'){
   const s=String(v||'').trim();
   const r=type==='article'?/^(?:article|art\\.?)\\s*/i:/^(?:section|sec\\.?|s\\.?)\\s*/i;
   return s.replace(r,'');
 }
};