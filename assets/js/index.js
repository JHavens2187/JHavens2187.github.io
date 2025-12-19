const container = document.getElementById("link-container");

if (container && config && config.links) {
    container.innerHTML = "";

    // Specific technical snippets for the "ACCESS_PORT" feel
    const cardDetails = {
        "My Research Projects": {
            desc: "Analyzing AGN dust attenuation using JWST spectra and the GLEAM tool.",
            code: "DATA_STREAM // 01"
        },
        "Class Projects & Papers": {
            desc: "Computer vision pipelines, Arduino hardware, and theoretical physics.",
            code: "DATA_STREAM // 02"
        },
        "View My CV": {
            desc: "Full academic record, technical skills, and coursework history.",
            code: "DATA_STREAM // 03"
        },
        "Talks & Outreach": {
            desc: "Teaching assistance for ASTR 591 and public astronomy volunteering.",
            code: "DATA_STREAM // 04"
        }
    };

    // Filter social links as they are in the footer
    const mainLinks = config.links.filter(link => 
        !["LinkedIn", "Bluesky"].includes(link.Title)
    );

    mainLinks.forEach((link, i) => {
        const col = document.createElement("div");
        const isBig = link.Title.includes("Research") || link.Title.includes("Projects");
        
        // Staggered animation delay logic from Video 3
        col.className = isBig ? "col-12 col-md-6 mb-4 fade-in-up" : "col-12 col-md-6 col-lg-4 mb-4 fade-in-up";
        col.style.animationDelay = `${i * 0.15}s`;

        const details = cardDetails[link.Title] || { desc: "Explore details.", code: "MODULE // >" };

        col.innerHTML = `
            <a href="${link.URL}" class="card h-100 bento-tile border-0 text-decoration-none">
                <div class="card-body d-flex flex-column align-items-center text-center p-4">
                    <div class="icon-box mb-3"><i class="${link.icon_classes}"></i></div>
                    <h5 class="card-title text-white font-weight-bold mb-2" style="font-family: 'Dosis', sans-serif;">${link.Title}</h5>
                    <p class="card-text small text-white-50" style="font-family: 'Abel', sans-serif;">
                        ${details.desc}
                    </p>
                    <div class="mt-auto module-code pt-3">${details.code}</div>
                </div>
            </a>
        `;
        container.appendChild(col);
    });
}
