const LINKS = {
  resume: "https://drive.google.com/drive/folders/1IqcUeBTdjL8mumhEZDF_Y3x7gi8C3LeX",
  portfolio: "/portfolio.html",
  home: "/",
  about: "/#about",
  contact: "https://www.linkedin.com/in/luispineda597",
  github: "https://github.com/weez97"
};

document.querySelectorAll("[data-link]").forEach(el => {
  const key = el.dataset.link;
  if (LINKS[key]) {
    el.href = LINKS[key];
  }
});