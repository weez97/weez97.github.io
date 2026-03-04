let cachedTexts = null;

async function loadLanguage(lang = "ENG") {
  // Load only once
  if (!cachedTexts) {
    const response = await fetch("../data/text_replacements.json");
    cachedTexts = await response.json();
  }

  const texts = cachedTexts.texts[lang];
  if (!texts) return;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (texts[key]) {
      el.innerHTML = texts[key];
    }
  });

  document.querySelectorAll("[data-i18n-tooltip]").forEach(el => {
    const key = el.getAttribute("data-i18n-tooltip");
    if (texts[key]) {
      el.setAttribute("data-tooltip", texts[key]);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadLanguage("ENG");
});