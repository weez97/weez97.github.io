function applyLanguageFlags() {
  const flags = {
    ENG: "🇺🇸",
    SPA: "🇪🇸"
  };

  document.querySelectorAll(".lang-label[data-lang]").forEach(el => {
    const lang = el.dataset.lang.toUpperCase();
    if (flags[lang]) {
      el.textContent = flags[lang];
    }
  });
}

document.addEventListener("DOMContentLoaded", applyLanguageFlags);