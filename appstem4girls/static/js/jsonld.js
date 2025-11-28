(function() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "STEAM 4 Girls",
        "url": "https://stem4girls.onrender.com/",
        "description": "Proyecto para gestionar contactos y recursos STEM.",
        "logo": "https://stem4girls.onrender.com/static/compartiresvivir.png"
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
})();