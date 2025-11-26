const input = document.getElementById("live-search-input");
const resultsBox = document.getElementById("live-search-results");
let timeout = null;

input.addEventListener("keyup", function () {
    const q = input.value.trim();

    clearTimeout(timeout);
    timeout = setTimeout(() => {
        if (q.length < 2) { // No buscar si hay menos de 2 caracteres
            resultsBox.innerHTML = "";
            return;
        }

        fetch(`/ajax/search/?q=${encodeURIComponent(q)}`)
            .then(response => response.json())
            .then(data => renderResults(data.recursos))
            .catch(err => console.error("Error AJAX:", err));
    }, 300); // Retraso 300ms para no saturar el servidor
});

function renderResults(recursos) {
    resultsBox.innerHTML = "";

    if (recursos.length === 0) {
        resultsBox.innerHTML = "<div class='result-item empty'>No se encontraron resultados</div>";
        return;
    }

    recursos.forEach(r => {
        const item = document.createElement("a");
        item.classList.add("result-item");
        item.href = r.url;
        item.setAttribute("role", "option");
        item.innerHTML = `<strong>${r.titulo}</strong>`;
        resultsBox.appendChild(item);
    });
}
