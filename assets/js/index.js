// --- TRUE TYPEWRITER BOOT SEQUENCE ---
async function typeLine(elementId, text, speed = 30) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.textContent = ""; // Clear any existing text
    element.parentElement.style.opacity = '1'; // Reveal the container line
    
    for (let i = 0; i < text.length; i++) {
        element.textContent += text.charAt(i);
        await new Promise(r => setTimeout(r, speed));
    }
}

async function runBootSequence() {
    const bootScreen = document.getElementById('boot-screen');
    const cursor = document.getElementById('cursor');

    // Remove cursor from flow initially
    if(cursor) cursor.remove();

    // Line 1: Technical initialization
    const line1 = document.getElementById('line-1');
    if (line1) line1.appendChild(cursor); 
    await typeLine('text-1', "> INITIALIZING ENVIRONMENT...", 25);
    
    // Line 2: Loading specific assets
    await new Promise(r => setTimeout(r, 200));
    if (line1 && cursor) cursor.remove();
    const line2 = document.getElementById('line-2');
    if (line2) line2.appendChild(cursor);
    await typeLine('text-2', "> LOADING MODULES: ASSETS, CONFIG...", 25);

    // Line 3: Ready state
    await new Promise(r => setTimeout(r, 200));
    if (line2 && cursor) cursor.remove();
    const line3 = document.getElementById('line-3');
    if (line3) {
        line3.appendChild(cursor);
        line3.style.color = '#5aad45'; // Green status
    }
    await typeLine('text-3', "> READY.", 25);

    // Fade Out
    await new Promise(r => setTimeout(r, 600));
    if (bootScreen) {
        bootScreen.style.opacity = '0';
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 800);
    }
}

// Start Boot Sequence
document.addEventListener('DOMContentLoaded', () => {
    runBootSequence();
});

// --- MAIN DASHBOARD LOGIC ---
try {
    const container = document.getElementById("link-container");

    if (container && typeof config !== 'undefined' && config.links) {
        container.innerHTML = "";

        const cardData = {
            "My Research Projects": { 
                desc: "Analyzing AGN dust attenuation using JWST spectra and GLEAM fitting.",
                img: "assets/img/spectral_plot.png",
                cls: "research-card"
            },
            "Class Projects & Papers": { 
                desc: "Computer vision pipelines, Arduino hardware, and theoretical physics.",
                img: "assets/img/Theoretical_Lagrangian.png",
                cls: "projects-card"
            },
            "View My CV": { 
                desc: "Full academic record, technical skills, and coursework history.",
                img: "assets/img/KU_phys_astro_logo.png",
                cls: "cv-card"
            },
            "Talks & Outreach": { 
                desc: "Teaching assistance for ASTR 591 and public astronomy volunteering.",
                img: "assets/img/outreach_pic.png",
                cls: "outreach-card"
            }
        };

        const mainLinks = config.links.filter(link => !["LinkedIn", "Bluesky"].includes(link.Title));

        mainLinks.forEach((link, i) => {
            const col = document.createElement("div");
            const isBig = link.Title.includes("Research") || link.Title.includes("Projects");
            col.className = isBig ? "col-12 col-md-6 mb-4 fade-in-up" : "col-12 col-md-6 col-lg-4 mb-4 fade-in-up";
            col.style.animationDelay = `${(i + 1) * 0.15}s`;

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
                        <div class="mt-auto"> 
                            <div class="icon-box"><i class="${link.icon_classes}"></i></div>
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

        // Spotlight Effect
        const cards = document.querySelectorAll('.bento-tile');
        cards.forEach(card => {
            card.onmousemove = e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            };
        });
    }
} catch (error) {
    console.error("Dashboard error:", error);
}
