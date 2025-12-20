// --- BOOT SEQUENCE LOGIC ---
async function typeLine(elementId, text, speed = 30) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.textContent = ""; 
    element.parentElement.style.opacity = '1'; 
    
    for (let i = 0; i < text.length; i++) {
        element.textContent += text.charAt(i);
        await new Promise(r => setTimeout(r, speed));
    }
}

async function runBootSequence() {
    const bootScreen = document.getElementById('boot-screen');
    // Only run if the boot screen exists on this page (about.html)
    if (!bootScreen) return; 

    const cursor = document.getElementById('cursor');
    if(cursor) cursor.remove();

    // Line 1
    const line1 = document.getElementById('line-1');
    if (line1) line1.appendChild(cursor); 
    await typeLine('text-1', "> INITIALIZING BIOMETRICS...", 25);
    
    // Line 2
    await new Promise(r => setTimeout(r, 200));
    if (line1 && cursor) cursor.remove();
    const line2 = document.getElementById('line-2');
    if (line2) line2.appendChild(cursor);
    await typeLine('text-2', "> LOADING ARCHIVES: 2022-2025...", 25);

    // Line 3
    await new Promise(r => setTimeout(r, 200));
    if (line2 && cursor) cursor.remove();
    const line3 = document.getElementById('line-3');
    if (line3) {
        line3.appendChild(cursor);
        line3.style.color = '#5aad45';
    }
    await typeLine('text-3', "> PROFILE LOADED.", 25);

    // Fade Out
    await new Promise(r => setTimeout(r, 600));
    if (bootScreen) {
        bootScreen.style.opacity = '0';
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 800);
    }
}

// --- MAIN INITIALIZATION & DASHBOARD LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Run Boot Sequence (if applicable)
    runBootSequence();

    // 2. Setup Universal Scroll Observer (Fade In/Out on scroll)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    // 3. Dashboard Card Generation (Only runs if link-container exists)
    try {
        const container = document.getElementById("link-container");
        if (container && typeof config !== 'undefined' && config.links) {
            
            container.innerHTML = "";
            
            // Map specific images and descriptions to card titles
            const cardData = {
                "My Research Projects": { 
                    desc: "Analyzing AGN dust attenuation using JWST spectra.", 
                    img: "assets/img/spectral_plot.png", 
                    cls: "research-card" 
                },
                "Class Projects & Papers": { 
                    desc: "Computer vision pipelines & Arduino hardware.", 
                    img: "assets/img/Theoretical_Lagrangian.png", 
                    cls: "projects-card" 
                },
                "View My CV": { 
                    desc: "Full academic record & skills.", 
                    img: "assets/img/KU_phys_astro_logo.png", 
                    cls: "cv-card" 
                },
                "About Me": { 
                    desc: "The Scientist, The Architect, and The Origin Story.", 
                    img: "assets/img/profile_pic.png", 
                    cls: "about-card"
                },
                "Talks & Outreach": { 
                    desc: "Teaching & volunteering.", 
                    img: "assets/img/outreach_pic.png", 
                    cls: "outreach-card" 
                }
            };
            
            // Filter out social links (LinkedIn, Bluesky) from the main grid
            const mainLinks = config.links.filter(link => !["LinkedIn", "Bluesky"].includes(link.Title));
            
            mainLinks.forEach((link, i) => {
                const col = document.createElement("div");
                // Research and Projects get full-width (col-md-6) on medium screens, 
                // others can fit 3 per row (col-lg-4) on large screens.
                const isBig = link.Title.includes("Research") || link.Title.includes("Projects");
                col.className = isBig ? "col-12 col-md-6 mb-4 fade-in-up" : "col-12 col-md-6 col-lg-4 mb-4 fade-in-up";
                col.style.animationDelay = `${(i + 1) * 0.15}s`;

                const data = cardData[link.Title] || { desc: "View module.", img: "assets/img/profile_pic.png", cls: "default-card" };

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

            // Spotlight Effect for Cards
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
    } catch (e) { 
        // Silent catch: console.log("Not on dashboard page") is unnecessary in production
    }
});
