const LINKS = {
  resume: "https://drive.google.com/drive/folders/XXXXXXXX",
  portfolio: "/portfolio.html",
  home: "/",
  about: "/index.html/#about",
};

document.querySelectorAll("[data-link]").forEach(el => {
  const key = el.dataset.link;
  if (LINKS[key]) {
    el.href = LINKS[key];
  }
});