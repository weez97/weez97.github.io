const LINKS = {
  resume: "https://drive.google.com/drive/folders/1IqcUeBTdjL8mumhEZDF_Y3x7gi8C3LeX",
  portfolio: "/portfolio.html",
  home: "/",
  about: "/#about",
  contact: "/contact.html",
  github: "https://github.com/weez97",
  linkedin: "https://www.linkedin.com/in/luispineda597",
  email: "mailto:luis.alonso97@gmail.com",
  discord: "https://discordapp.com/users/354459054807973891",
};

document.querySelectorAll("[data-link]").forEach(el => {
  const key = el.dataset.link;
  if (LINKS[key]) {
    el.href = LINKS[key];
  }
});