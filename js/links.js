const LINKS = {
  resume: "https://drive.google.com/drive/folders/1IqcUeBTdjL8mumhEZDF_Y3x7gi8C3LeX?usp=sharing",
  portfolio: "/portfolio.html",
  home: "/",
  about: "/#about",
};

document.querySelectorAll("[data-link]").forEach(el => {
  const key = el.dataset.link;
  if (LINKS[key]) {
    el.href = LINKS[key];
  }
});