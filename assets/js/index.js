const link_container = document.getElementById("link-container");

// Clear any old content
link_container.innerHTML = "";

// Map descriptions to your links to fill out the Bento cards
const descriptions = {
    "My Research Projects": "Analyzing AGN dust attenuation using JWST spectra and the GLEAM fitting tool.",
    "Class Projects & Coursework": "Computer vision pipelines, Arduino instrumentation, and theoretical physics derivations.",
    "View My CV": "A comprehensive record of my academic research, technical skills, and coursework.",
    "Talks & Outreach": "Teaching assistance for ASTR 591 and public astronomy volunteering at KU.",
    "LinkedIn": "Connect with me professionally and stay updated on my latest projects.",
    "Bluesky": "Following the latest in the astronomy and physics community."
};

config.links.forEach(link => {
    const col = document.createElement("div");
    // Layout: Research and Projects get larger columns, others are smaller
    const isMajor = link.Title.includes("Research") || link.Title.includes("Projects");
    col.className = isMajor ? "col-md-6 mb-4" : "col-md-6 col-lg-4 mb-4";

    col.innerHTML = `
        <a href="${link.URL}" class="text-decoration-none h-100 d-block">
            <div class="card h-100 shadow-lg border-0">
                <div class="card-body d-flex flex-column align-items-center text-center p-4">
                    <i class="${link.icon_classes} mb-3" style="font-size: 2.2rem; color: var(--accent-glow);"></i>
                    <h5 class="card-title text-white font-weight-bold mb-2" style="font-family: 'Dosis', sans-serif; letter-spacing: 1px;">
                        ${link.Title}
                    </h5>
                    <p class="card-text small text-white-50" style="font-family: 'Abel', sans-serif;">
                        ${descriptions[link.Title] || "Click to explore."}
                    </p>
                    <div class="mt-auto pt-2">
                        <span style="font-family: 'Roboto Mono', monospace; font-size: 0.7rem; color: var(--accent-glow); opacity: 0.8;">
                            OPEN_MODULE // >
                        </span>
                    </div>
                </div>
            </div>
        </a>
    `;
    link_container.appendChild(col);
});
