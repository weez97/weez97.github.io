document.addEventListener("DOMContentLoaded", () => {
  const aboutContent = document.querySelector(".about__content");
  if (!aboutContent) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        aboutContent.classList.add("is_visible");
        observer.disconnect();
      }
    },
    { threshold: 0.25 }
  );

  observer.observe(aboutContent);
});