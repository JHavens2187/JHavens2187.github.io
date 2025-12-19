const container = document.getElementById("link-container");

if (container && config && config.links) {
    container.innerHTML = "";

    const cardDetails = {
        "My Research Projects": {
            desc: "Analyzing AGN dust attenuation using JWST spectra and GLEAM.",
            code: "fit = gleam.fit(spectrum, lines=['Ha', 'Hb'])"
        },
        "Class Projects & Coursework": {
            desc: "Computer vision pipelines, Arduino hardware, and theoretical physics.",
            code: "cv2.HoughCircles(gray, cv2.HOUGH_GRADIENT, 1, 20)"
        },
        "View My CV": {
            desc: "Full academic record, technical skills, and coursework history.",
            code: "\\documentclass{article} \\begin{document}"
        },
        "Talks & Outreach": {
            desc: "Teaching assistance for ASTR 591 and public astronomy volunteering.",
            code: "print('Welcome to the KU Planetarium!')"
        }
    };

    const professionalLinks = config.links.filter(link => 
        !["LinkedIn", "Bluesky"].includes(link.Title)
    );

    professionalLinks.forEach((link, i) => {
        const col = document.createElement("div");
        const isBig = link.Title.includes("Research") || link.Title.includes("Projects");
        col.className = isBig ? "col-md-6 mb-4 fade-in-up" : "col-md-4 mb-4 fade-in-up";
        col.style.animationDelay = `${i * 0.1}s`;

        const details = cardDetails[link.Title] || { desc: "Explore module.", code: "system.exec()" };

        col.innerHTML = `
            <a href="${link.URL}" class="card h-100 bento-tile border-0 text-decoration-none">
                <div class="code-overlay">${details.code}</div>
                <div class="card-body d-flex flex-column align-items-center text-center p-4">
                    <div class="icon-box mb-3"><i class="${link.icon_classes}"></i></div>
                    <h5 class="card-title text-white font-weight-bold mb-2">${link.Title}</h5>
                    <p class="card-text small text-white-50">${details.desc}</p>
                    <div class="mt-auto module-code pt-3">ACCESS_PORT // 0${i+1}</div>
                </div>
            </a>
        `;
        container.appendChild(col);
    });
}
