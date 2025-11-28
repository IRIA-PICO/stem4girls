(function() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "STEAM 4 Girls",
        "url": "https://tusitio.com",
        "description": "Proyecto para gestionar contactos y recursos STEM.",
        "logo": "https://tusitio.com/static/logo.png"
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
})();