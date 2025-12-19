const link_container = document.getElementById("link-container");

if (link_container) {
    link_container.innerHTML = ""; 

    const descriptions = {
        "My Research Projects": "Analyzing AGN dust attenuation using JWST spectra and the GLEAM fitting tool.",
        "Class Projects & Coursework": "Computer vision pipelines, Arduino instrumentation, and theoretical physics.",
        "View My CV": "A comprehensive record of academic research, technical skills, and coursework.",
        "Talks & Outreach": "Teaching assistance for ASTR 591 and public astronomy volunteering at KU."
    };

    // Filter out LinkedIn/Bluesky big buttons as requested
    const professionalLinks = config.links.filter(link => 
        !["LinkedIn", "Bluesky"].includes(link.Title)
    );

    professionalLinks.forEach((link, index) => {
        const col = document.createElement("div");
        const isMajor = link.Title.includes("Research") || link.Title.includes("Projects");
        col.className = isMajor ? "col-md-6 mb-4 fade-in-up" : "col-md-6 col-lg-4 mb-4 fade-in-up";
        col.style.animationDelay = `${index * 0.1}s`;

        col.innerHTML = `
            <a href="${link.URL}" class="text-decoration-none h-100 d-block">
                <div class="card h-100 shadow-lg border-0 bento-tile">
                    <div class="card-body d-flex flex-column align-items-center text-center p-4">
                        <div class="icon-box mb-3">
                            <i class="${link.icon_classes}"></i>
                        </div>
                        <h5 class="card-title text-white font-weight-bold mb-2">
                            ${link.Title}
                        </h5>
                        <p class="card-text small text-white-50">
                            ${descriptions[link.Title] || "Explore this module."}
                        </p>
                        <div class="mt-auto pt-2">
                            <span class="module-code">
                                ACCESS_PORT // 0${index + 1}
                            </span>
                        </div>
                    </div>
                </div>
            </a>
        `;
        link_container.appendChild(col);
    });
}
