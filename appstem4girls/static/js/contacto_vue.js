const contactos = [
  { nombre: "Juan Pérez", email: "juan@example.com", telefono: "123456789" },
  { nombre: "Ana Gómez", email: "ana@example.com", telefono: "987654321" }
];

// Función JSON-LD: ahora acepta el array a serializar
function generarJSONLD(personasArray) {
    const data = {
        "@context": "https://schema.org",
        "@graph": personasArray.map(p => ({
            "@type": "Person",
            "name": p.nombre,
            "email": p.email,
            "telephone": p.telefono
        }))
    };

    const oldScript = document.getElementById("jsonld-contactos");
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "jsonld-contactos";
    script.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(script);
}

// Aplicación Vue
new Vue({
    el: '#app',
    data: {
        // Copia de contactos para evitar compartir la misma referencia
        personas: contactos.slice(),
        nuevo: { nombre: '', email: '', telefono: '' },
        editando: null,
        busqueda: '',
        ordenarPor: 'nombre'
    },
    computed: {
        contactosFiltrados() {
            let resultado = this.personas;
            
            if (this.busqueda.trim()) {
                const busq = this.busqueda.toLowerCase();
                resultado = resultado.filter(p => 
                    p.nombre.toLowerCase().includes(busq) ||
                    p.email.toLowerCase().includes(busq) ||
                    p.telefono.includes(busq)
                );
            }
            
            // Orden simple por nombre (puedes usar ordenarPor si quieres)
            resultado = [...resultado].sort((a, b) => a.nombre.localeCompare(b.nombre));
            
            return resultado;
        }
    },
    methods: {
        agregarPersona() {
            if (this.nuevo.nombre && this.nuevo.email && this.nuevo.telefono) {
                if (this.editando !== null) {
                    // actualizar en la lista reactiva
                    this.$set(this.personas, this.editando, { ...this.nuevo });
                    this.cancelarEdicion();
                } else {
                    // SOLO push en this.personas (no duplicar en 'contactos')
                    this.personas.push({ ...this.nuevo });
                }
                this.nuevo = { nombre: '', email: '', telefono: '' };
                // regenerar JSON-LD desde this.personas
                generarJSONLD(this.personas);
            } else {
                alert("Por favor, completa todos los campos.");
            }
        },
        
        editarPersona(index) {
            this.editando = index;
            this.nuevo = { ...this.personas[index] };
            const el = document.getElementById('nuevo');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        },
        
        cancelarEdicion() {
            this.editando = null;
            this.nuevo = { nombre: '', email: '', telefono: '' };
        },
        
        eliminarPersona(index) {
            if (confirm("¿Estás seguro de que deseas eliminar este contacto?")) {
                this.personas.splice(index, 1);
                generarJSONLD(this.personas);
            }
        }
    },
    mounted() {
        console.log("✅ Vue iniciado");
        generarJSONLD(this.personas);
    }
});
