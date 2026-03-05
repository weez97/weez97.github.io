function countryCodeToFlag(code) {
    return [...code.toUpperCase()]
        .map(c => String.fromCodePoint(127397 + c.charCodeAt()))
        .join("");
}

async function loadPortfolio() {
    const res = await fetch("./data/portfolio.json");
    const data = await res.json();

    const container = document.getElementById("portfolio__grid");
    const template = document.getElementById("portfolio-template");

    container.innerHTML = "";

    data.projects.forEach((project, index) => {
        const fragment = template.content.cloneNode(true);

        const card = fragment.querySelector(".portfolio__element");
        card.style.setProperty("--i", index);

        if (project.ref && project.ref.trim() !== "") {
            fragment.querySelector(".portfolio__element").href = project.ref;
        }
        const img = fragment.querySelector(".portfolio__element--picture");
        img.src = project.image;
        img.alt = project.image || "";

        fragment.querySelector(".portfolio__element--title").setAttribute("data-i18n", project.title);

        let parts = [
            project.company,
            countryCodeToFlag(project.location),
            project.year
        ].filter(v => v && v.trim() !== "");

        let s = parts.join(" ");

        fragment.querySelector(".portfolio__element--location").textContent = s;

        fragment.querySelector(".portfolio__element--text").setAttribute("data-i18n", project.description);

        const tagLine = fragment.querySelector(".portfolio__element--tagLine");

        (project.tags?.os || []).forEach(t => {
            const tag = document.createElement("div");
            tag.className = "portfolio__element--osTag";
            tag.textContent = t;
            tagLine.appendChild(tag);
        });

        (project.tags?.tech || []).forEach(t => {
            const tag = document.createElement("div");
            tag.className = "portfolio__element--techTag";
            tag.textContent = t;
            tagLine.appendChild(tag);
        });

        if (project.tags?.nda) {
            const nda = document.createElement("div");
            nda.className = "portfolio__element--ndaTag";
            nda.textContent = "NDA";
            nda.setAttribute("data-i18n-tooltip", "nda_tooltip");
            tagLine.appendChild(nda);
        }

        container.appendChild(fragment);
    });

    loadLanguage(getSavedLanguage());
}

document.addEventListener("DOMContentLoaded", () => {
    loadPortfolio();
});