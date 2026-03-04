document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".hero__title").forEach((el) => {
    if (el.dataset.splitted === "1") return;
    el.dataset.splitted = "1";

    const text = el.dataset.text ?? el.textContent;
    el.textContent = "";

    [...text].forEach((ch, i) => {
      const span = document.createElement("span");
      span.className = "hero__char";
      span.style.setProperty("--i", i);

      span.textContent = ch === " " ? "\u00A0" : ch;
      span.setAttribute("data-fill", span.textContent);

      el.appendChild(span);
    });
  });
});