const container = document.getElementById("link-container");

if (container && config && config.links) {
    container.innerHTML = "";

    const cardMeta = {
        "My Research Projects": { desc: "Analyzing AGN dust attenuation using JWST spectra.", cls: "research-card" },
        "Class Projects & Papers": { desc: "Computer vision pipelines & Arduino instrumentation.", cls: "projects-card" },
        "View My CV": { desc: "Academic record, technical skills, and coursework.", cls: "cv-card" },
        "Talks & Outreach": { desc: "Teaching assistance and public astronomy volunteering.", cls: "outreach-card" }
    };

    const mainLinks = config.links.filter(link => !["LinkedIn", "Bluesky"].includes(link.Title));

    mainLinks.forEach((link, i) => {
        const col = document.createElement("div");
        col.className = "col-12 col-md-6 mb-4 fade-in-up"; 
        col.style.animationDelay = `${(i + 1) * 0.1}s`;

        const meta = cardMeta[link.Title] || { desc: "View module.", cls: "default-card" };

        col.innerHTML = `
            <a href="${link.URL}" class="card h-100 bento-tile border-0 text-decoration-none ${meta.cls}">
                <div class="card-body d-flex flex-column align-items-center text-center p-4">
                    <div class="icon-box mb-3" style="font-size: 2.5rem; color: var(--accent-glow);">
                        <i class="${link.icon_classes}"></i>
                    </div>
                    <h5 class="card-title text-white font-weight-bold mb-2" style="font-family: 'Dosis', sans-serif;">${link.Title}</h5>
                    <p class="card-text small text-white-50" style="font-family: 'Abel', sans-serif;">${meta.desc}</p>
                    <div class="mt-auto module-code pt-3">DATA_STREAM // 0${i+1}</div>
                </div>
            </a>
        `;
        container.appendChild(col);
    });

    // --- SPOTLIGHT EFFECT LOGIC (Apple Style) ---
    // Instead of tilting the card, we move a radial gradient based on mouse position
    const cards = document.querySelectorAll('.bento-tile');
    
    cards.forEach(card => {
        card.onmousemove = e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set CSS variables that the ::before pseudo-element uses
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        };
    });
}
