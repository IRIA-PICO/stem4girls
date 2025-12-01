// Datos iniciales
const contactos = [
  { nombre: "Juan Pérez", email: "juan@example.com", telefono: "123456789" },
  { nombre: "Ana Gómez", email: "ana@example.com", telefono: "987654321" }
];

// Función JSON-LD
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
        personas: contactos,
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
            
            resultado = [...resultado].sort((a, b) => {
                return a.nombre.localeCompare(b.nombre);
            });
            
            return resultado;
        }
    },
    methods: {
        agregarPersona() {
            if (this.nuevo.nombre && this.nuevo.email && this.nuevo.telefono) {
                if (this.editando !== null) {
                    this.$set(this.personas, this.editando, { ...this.nuevo });
                    this.$set(contactos, this.editando, { ...this.nuevo });
                    this.cancelarEdicion();
                } else {
                    this.personas.push({ ...this.nuevo });
                    contactos.push({ ...this.nuevo });
                }
                this.nuevo = { nombre: '', email: '', telefono: '' };
                generarJSONLD();
            } else {
                alert("Por favor, completa todos los campos.");
            }
        },
        
        editarPersona(index) {
            this.editando = index;
            this.nuevo = { ...this.personas[index] };
            document.getElementById('nuevo').scrollIntoView({ behavior: 'smooth' });
        },
        
        cancelarEdicion() {
            this.editando = null;
            this.nuevo = { nombre: '', email: '', telefono: '' };
        },
        
        eliminarPersona(index) {
            if (confirm("¿Estás seguro de que deseas eliminar este contacto?")) {
                this.personas.splice(index, 1);
                contactos.splice(index, 1);
                generarJSONLD();
            }
        }
    },
    mounted() {
        console.log("✅ Vue iniciado");
        generarJSONLD();
    }
});
