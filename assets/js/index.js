const link_container = document.getElementById("link-container");

// Clear existing content
link_container.innerHTML = "";

// Generate Tiles
config.links.forEach(link => {
    // Create a column wrapper
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4 mb-4"; // 3 cards per row on large screens

    col.innerHTML = `
        <a href="${link.URL}" class="text-decoration-none h-100">
            <div class="card h-100 shadow-lg text-center p-4">
                <div class="card-body d-flex flex-column align-items-center justify-content-center">
                    <i class="${link.icon_classes} mb-3" style="font-size: 2.5rem; color: var(--accent-glow);"></i>
                    <h5 class="card-title text-white font-weight-bold" style="font-family: 'Dosis', sans-serif;">${link.Title}</h5>
                    <p class="card-text small text-white-50 mt-2">Explore ${link.Title.toLowerCase()} and technical work.</p>
                </div>
            </div>
        </a>
    `;
    link_container.appendChild(col);
});
