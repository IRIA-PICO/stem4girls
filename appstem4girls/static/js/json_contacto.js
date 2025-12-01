const contactos = [
  { nombre: "Juan Pérez", email: "juan@example.com", telefono: "123456789" },
  { nombre: "Ana Gómez", email: "ana@example.com", telefono: "987654321" }
];

function generarJSONLD() {
    const data = {
        "@context": "https://schema.org",
        "@graph": contactos.map(p => ({
            "@type": "Person",
            "name": p.nombre,
            "email": p.email,
            "telephone": p.telefono
        }))
    };

    // Crear script dinámico en <head>
    const oldScript = document.getElementById("jsonld-contactos");
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "jsonld-contactos";
    script.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(script);

    console.log("JSON-LD generado desde JS externo:", data);
}

// Ejecutar al cargar
generarJSONLD();
