// --- TRUE TYPEWRITER BOOT SEQUENCE ---
async function typeLine(element, text, speed = 50) {
    element.textContent = ""; // Clear existing
    element.style.opacity = '1';
    
    for (let i = 0; i < text.length; i++) {
        element.textContent += text.charAt(i);
        await new Promise(r => setTimeout(r, speed));
    }
}

async function runBootSequence() {
    const bootScreen = document.getElementById('boot-screen');
    const line1 = document.getElementById('line-1');
    const line2 = document.getElementById('line-2');
    const line3 = document.getElementById('line-3');
    const cursor = document.getElementById('cursor'); // We will move this

    if (!bootScreen || !line1) return;

    // Line 1
    cursor.remove(); // Detach cursor to move it
    line1.appendChild(cursor); // Attach to line 1
    await typeLine(line1.firstChild, "INITIALIZING TELESCOPE UPLINK...", 40);
    
    // Line 2
    await new Promise(r => setTimeout(r, 300));
    cursor.remove();
    line2.appendChild(cursor);
    await typeLine(line2.firstChild, "CALIBRATING SENSORS...", 40);

    // Line 3
    await new Promise(r => setTimeout(r, 300));
    cursor.remove();
    line3.appendChild(cursor);
    line3.style.color = '#5aad45';
    await typeLine(line3.firstChild, "CONNECTION ESTABLISHED.", 40);

    // Fade Out
    await new Promise(r => setTimeout(r, 800));
    bootScreen.style.opacity = '0';
    setTimeout(() => {
        bootScreen.style.display = 'none';
    }, 1000);
}

// Start Boot Sequence Immediately on Load
window.addEventListener('load', () => {
    try {
        runBootSequence();
    } catch (e) {
        console.error("Boot sequence failed:", e);
        const bs = document.getElementById('boot-screen');
        if(bs) bs.style.display = 'none';
    }
});


// --- MAIN DASHBOARD LOGIC ---
try {
    const container = document.getElementById("link-container");

    if (container && typeof config !== 'undefined' && config.links) {
        container.innerHTML = "";

        // Mapping relevant images to the cards
        const cardData = {
            "My Research Projects": { 
                desc: "Analyzing AGN dust attenuation using JWST spectra and GLEAM fitting.",
                img: "assets/img/spectral_plot.png",
                cls: "research-card"
            },
            "Class Projects & Papers": { 
                desc: "Computer vision pipelines, Arduino hardware, and theoretical physics.",
                img: "assets/img/Theoretical_Lagrangian.png", /* Your specific image */
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

        // Spotlight Effect Logic
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
    } else {
        console.error("Config not found or invalid!");
    }
} catch (error) {
    console.error("Critical error in dashboard logic:", error);
}
