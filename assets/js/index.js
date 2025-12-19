const container = document.getElementById("link-container");

if (container && config && config.links) {
    container.innerHTML = "";

    // Mapping relevant images to the cards
    // We use the images you already have in your assets folder
    const cardData = {
        "My Research Projects": { 
            desc: "Analyzing AGN dust attenuation using JWST spectra and GLEAM fitting.",
            img: "assets/img/spectral_plot.png", // From research.html
            cls: "research-card"
        },
        "Class Projects & Papers": { 
            desc: "Computer vision pipelines, Arduino hardware, and theoretical physics.",
            img: "assets/img/prescott_fig1.png", // Placeholder using existing science plot
            cls: "projects-card"
        },
        "View My CV": { 
            desc: "Full academic record, technical skills, and coursework history.",
            img: "assets/img/KU_phys_astro_logo.png", // From outreach.html
            cls: "cv-card"
        },
        "Talks & Outreach": { 
            desc: "Teaching assistance for ASTR 591 and public astronomy volunteering.",
            img: "assets/img/outreach_pic.png", // From outreach.html
            cls: "outreach-card"
        }
    };

    const mainLinks = config.links.filter(link => !["LinkedIn", "Bluesky"].includes(link.Title));

    mainLinks.forEach((link, i) => {
        const col = document.createElement("div");
        const isBig = link.Title.includes("Research") || link.Title.includes("Projects");
        col.className = isBig ? "col-12 col-md-6 mb-4 fade-in-up" : "col-12 col-md-6 col-lg-4 mb-4 fade-in-up";
        col.style.animationDelay = `${(i + 1) * 0.15}s`;

        // Default fallback if no image found
        const data = cardData[link.Title] || { 
            desc: "View module.", 
            img: "assets/img/profile_pic.png", 
            cls: "default-card" 
        };

        col.innerHTML = `
            <a href="${link.URL}" class="card h-100 bento-tile border-0 text-decoration-none ${data.cls}">
                <div class="tile-bg" style="background-image: url('${data.img}');"></div>
                
                <div class="tile-overlay"></div>

                <div class="card-body d-flex flex-column align-items-center text-center p-4">
                    <div class="mt-auto"> <div class="icon-box">
                            <i class="${link.icon_classes}"></i>
                        </div>
                        <h5 class="card-title text-white font-weight-bold" style="font-family: 'Dosis', sans-serif; font-size: 1.5rem; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">
                            ${link.Title}
                        </h5>
                        
                        <div class="reveal-text">
                            <p class="small text-white-50 mb-2" style="font-family: 'Abel', sans-serif; font-size: 1rem;">${data.desc}</p>
                            <div class="module-code" style="font-family: 'Roboto Mono', monospace; font-size: 0.7rem; color: var(--accent-glow);">
                                DATA_STREAM // 0${i+1}
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        `;
        container.appendChild(col);
    });
}
