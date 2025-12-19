const container = document.getElementById("link-container");

if (container && config && config.links) {
    container.innerHTML = "";

    // Specific Metadata for Cards
    const cardMeta = {
        "My Research Projects": {
            desc: "Analyzing AGN dust attenuation using JWST spectra and GLEAM fitting.",
            cls: "research-card"
        },
        "Class Projects & Papers": {
            desc: "Computer vision pipelines, Arduino hardware, and theoretical physics.",
            cls: "projects-card"
        },
        "View My CV": {
            desc: "Full academic record, technical skills, and coursework history.",
            cls: "cv-card"
        },
        "Talks & Outreach": {
            desc: "Teaching assistance for ASTR 591 and public astronomy volunteering.",
            cls: "outreach-card"
        }
    };

    const mainLinks = config.links.filter(link => !["LinkedIn", "Bluesky"].includes(link.Title));

    mainLinks.forEach((link, i) => {
        const col = document.createElement("div");
        // Force 2 columns on desktop
        col.className = "col-12 col-md-6 mb-4 fade-in-up"; 
        col.style.animationDelay = `${(i + 1) * 0.15}s`;

        const meta = cardMeta[link.Title] || { desc: "View module.", cls: "default-card" };

        col.innerHTML = `
            <a href="${link.URL}" class="card h-100 bento-tile border-0 text-decoration-none ${meta.cls}">
                <div class="card-body d-flex flex-column align-items-center text-center p-4">
                    <div class="icon-box mb-3" style="font-size: 2.5rem; color: var(--accent-glow);">
                        <i class="${link.icon_classes}"></i>
                    </div>
                    <h5 class="card-title text-white font-weight-bold mb-2" style="font-family: 'Dosis', sans-serif;">${link.Title}</h5>
                    <p class="card-text small text-white-50" style="font-family: 'Abel', sans-serif;">${meta.desc}</p>
                    <div class="mt-auto module-code pt-3">
                        DATA_STREAM // 0${i+1}
                    </div>
                </div>
            </a>
        `;
        container.appendChild(col);
    });
}
