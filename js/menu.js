const menu = document.querySelector(".menu");
const btn = document.querySelector(".menu__hamburger");

btn.addEventListener("click", (e) => {
  e.stopPropagation();
  menu.classList.toggle("is-open");
});

document.addEventListener("click", () => {
  menu.classList.remove("is-open");
});