let cachedTexts = null;

const LANG_KEY = "site_lang";
const DEFAULT_LANG = "ENG";

const I18N_URL = "/data/text_replacements.json";

function getSavedLanguage() {
  return (localStorage.getItem(LANG_KEY) || DEFAULT_LANG).toUpperCase();
}

function saveLanguage(lang) {
  localStorage.setItem(LANG_KEY, (lang || DEFAULT_LANG).toUpperCase());
}

function updateLangToggleUI(lang) {
  const chosen = (lang || DEFAULT_LANG).toUpperCase();

  const switchEl = document.getElementById("langSwitch");
  if (switchEl) {
    switchEl.classList.toggle("active", chosen === "SPA");
    switchEl.setAttribute("aria-checked", String(chosen === "SPA"));
  }

  document.querySelectorAll("[data-lang]").forEach(el => {
    const elLang = (el.dataset.lang || "").toUpperCase();
    el.classList.toggle("active", elLang === chosen);
    el.setAttribute("aria-current", elLang === chosen ? "true" : "false");
  });
}

async function loadLanguage(lang) {
  const chosen = (lang || DEFAULT_LANG).toUpperCase();
  saveLanguage(chosen);

  // Load only once
  if (!cachedTexts) {
    const response = await fetch(I18N_URL, { cache: "no-store" });
    if (!response.ok) {
      console.error("i18n fetch failed:", response.status, response.statusText, I18N_URL);
      return;
    }
    cachedTexts = await response.json();
  }

  const texts = cachedTexts.texts?.[chosen];
  if (!texts) {
    console.warn("i18n: missing language key:", chosen);
    return;
  }

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (texts[key] != null) el.innerHTML = texts[key];
  });

  document.querySelectorAll("[data-i18n-tooltip]").forEach(el => {
    const key = el.getAttribute("data-i18n-tooltip");
    if (texts[key] != null) el.setAttribute("data-tooltip", texts[key]);
  });

  updateLangToggleUI(chosen);
}

function initLangToggleHooks() {
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-lang]");
    if (!el) return;
    loadLanguage(el.dataset.lang);
  });

  const switchEl = document.getElementById("langSwitch");
  if (switchEl) {
    switchEl.setAttribute("role", "switch");
    switchEl.tabIndex = 0;

    const toggle = () => {
      const current = getSavedLanguage();
      const next = current === "ENG" ? "SPA" : "ENG";
      loadLanguage(next);
    };

    switchEl.addEventListener("click", toggle);
    switchEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initLangToggleHooks();
  loadLanguage(getSavedLanguage());
});