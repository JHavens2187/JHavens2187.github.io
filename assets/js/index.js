const container = document.getElementById("link-container");

if (container && config && config.links) {
    container.innerHTML = "";

    const cardData = {
        "My Research Projects": "Analyzing AGN dust attenuation using JWST spectra and the GLEAM fitting tool.",
        "Class Projects & Coursework": "Computer vision pipelines, Arduino hardware, and theoretical physics derivations.",
        "View My CV": "A comprehensive record of academic research, technical skills, and coursework.",
        "Talks & Outreach": "Teaching assistance for ASTR 591 and public astronomy volunteering at KU."
    };

    const professionalLinks = config.links.filter(link => 
        !["LinkedIn", "Bluesky"].includes(link.Title)
    );

    professionalLinks.forEach((link, i) => {
        const col = document.createElement("div");
        const isBig = link.Title.includes("Research") || link.Title.includes("Projects");
        
        col.className = isBig ? "col-12 col-md-6 mb-4" : "col-12 col-md-6 col-lg-4 mb-4";

        col.innerHTML = `
            <a href="${link.URL}" class="card h-100 bento-tile border-0 text-decoration-none">
                <div class="card-body d-flex flex-column align-items-center text-center p-4">
                    <div class="icon-box mb-3"><i class="${link.icon_classes}"></i></div>
                    <h5 class="card-title text-white font-weight-bold mb-2" style="font-family: 'Dosis', sans-serif;">${link.Title}</h5>
                    <p class="card-text small text-white-50" style="font-family: 'Abel', sans-serif; line-height: 1.5;">
                        ${cardData[link.Title] || "Click to explore module details."}
                    </p>
                    <div class="mt-auto module-code pt-3">ACCESS_PORT // 0${i+1}</div>
                </div>
            </a>
        `;
        container.appendChild(col);
    });
}
