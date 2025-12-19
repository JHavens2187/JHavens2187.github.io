const container = document.getElementById("link-container");

if (container && config && config.links) {
    container.innerHTML = "";

    // Specific descriptions for the Bento tiles
    const cardDetails = {
        "My Research Projects": "AGN dust attenuation analysis via JWST & GLEAM.",
        "Class Projects & Coursework": "Computer vision pipelines and theoretical physics.",
        "View My CV": "Academic record, technical skills, and coursework.",
        "Talks & Outreach": "Teaching assistance and public astronomy volunteering."
    };

    const mainLinks = config.links.filter(link => !["LinkedIn", "Bluesky"].includes(link.Title));

    mainLinks.forEach((link, i) => {
        const col = document.createElement("div");
        // Logic: 2 columns for major projects, 3 for others
        const isBig = link.Title.includes("Research") || link.Title.includes("Projects");
        col.className = isBig ? "col-md-6 mb-4" : "col-md-6 col-lg-4 mb-4";

        col.innerHTML = `
            <a href="${link.URL}" class="card h-100 bento-tile border-0 text-decoration-none">
                <div class="card-body d-flex flex-column align-items-center text-center p-4">
                    <div class="icon-box mb-3"><i class="${link.icon_classes}"></i></div>
                    <h5 class="card-title text-white font-weight-bold mb-2">${link.Title}</h5>
                    <p class="card-text small text-white-50">${cardDetails[link.Title] || "View details."}</p>
                    <div class="mt-auto module-code pt-3">ACCESS_PORT // 0${i+1}</div>
                </div>
            </a>
        `;
        container.appendChild(col);
    });
}
