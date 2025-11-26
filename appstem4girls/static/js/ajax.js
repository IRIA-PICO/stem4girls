(function() {
    // Todo el código dentro de una función autoejecutable
    const input = document.getElementById("live-search-input");
    const resultsGrid = document.querySelector(".grid_recursos");
    
    if (!input || !resultsGrid) {
        console.log("Buscador no disponible en esta página");
        return;
    }

    const originalHTML = resultsGrid.innerHTML;
    let timeout = null;

    input.addEventListener("keyup", function () {
        const q = input.value.trim();

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (q.length < 2) {
                resultsGrid.innerHTML = originalHTML;
                return;
            }

            fetch(`/ajax/search/?q=${encodeURIComponent(q)}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la respuesta del servidor');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Datos recibidos:", data);
                    renderResults(data.recursos);
                })
                .catch(err => {
                    console.error("Error AJAX:", err);
                    resultsGrid.innerHTML = "<p>Error al buscar. Por favor, intenta de nuevo.</p>";
                });
        }, 300);
    });

    function renderResults(recursos) {
        resultsGrid.innerHTML = "";

        if (recursos.length === 0) {
            resultsGrid.innerHTML = "<p>No se encontraron resultados</p>";
            return;
        }

        recursos.forEach(r => {
            const card = document.createElement("div");
            card.classList.add("recurso_card");
            card.innerHTML = `
                <div>
                    <h2>${r.titulo}</h2>
                    <div class="enlace_recursos">
                        <a href="${r.url}">Ver más detalles</a>
                    </div>
                </div>
            `;
            resultsGrid.appendChild(card);
        });
    }
})();