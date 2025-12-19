const container = document.getElementById("link-container");

if (container && config && config.links) {
    container.innerHTML = "";

    const cardData = {
        "My Research Projects": "Analyzing AGN dust attenuation using JWST spectra and the GLEAM tool.",
        "Class Projects & Coursework": "Computer vision pipelines, Arduino hardware, and theoretical physics.",
        "View My CV": "Full academic record, technical skills, and coursework history.",
        "Talks & Outreach": "Teaching assistance for ASTR 591 and public astronomy volunteering."
    };

    config.links.forEach((link, i) => {
        // Skip LinkedIn/Bluesky big buttons
        if (["LinkedIn", "Bluesky"].includes(link.Title)) return;

        const col = document.createElement("div");
        // Research and Projects get half-width (6), others get third-width (4)
        const isBig = link.Title.includes("Research") || link.Title.includes("Projects");
        col.className = isBig ? "col-md-6 mb-4" : "col-md-4 mb-4";

        col.innerHTML = `
            <a href="${link.URL}" class="card h-100 bento-tile text-center p-4">
                <div class="card-body d-flex flex-column align-items-center">
                    <div class="icon-box"><i class="${link.icon_classes}"></i></div>
                    <h5 class="card-title text-white font-weight-bold">${link.Title}</h5>
                    <p class="card-text small text-white-50">${cardData[link.Title] || "View details"}</p>
                    <div class="mt-auto module-code">DATA_STREAM // 0${i+1}</div>
                </div>
            </a>
        `;
        container.appendChild(col);
    });
}
