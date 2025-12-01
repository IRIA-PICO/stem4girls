new Vue({
    el: '#app',
    data: {
        personas: [
            // Ejemplo inicial, puedes dejar vacío
            { nombre: "Juan Pérez", email: "juan@example.com", telefono: "123456789" },
            { nombre: "Ana Gómez", email: "ana@example.com", telefono: "987654321" }
        ],
        nuevo: {
            nombre: '',
            email: '',
            telefono: ''
        },
        editando: null,    // índice del contacto que se está editando
        busqueda: '',      // texto del buscador
        ordenarPor: 'nombre' // criterio de orden
    },
    computed: {
        contactosFiltrados() {
            let resultado = [...this.personas];

            // Filtrar por búsqueda
            if (this.busqueda) {
                const term = this.busqueda.toLowerCase();
                resultado = resultado.filter(p =>
                    p.nombre.toLowerCase().includes(term) ||
                    p.email.toLowerCase().includes(term) ||
                    p.telefono.toLowerCase().includes(term)
                );
            }

            // Ordenar según el criterio
            if (this.ordenarPor === 'nombre') {
                resultado = resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
            } 

            return resultado;
        }
    },
    methods: {
        agregarPersona() {
            // Validar campos
            if(this.nuevo.nombre && this.nuevo.email && this.nuevo.telefono) {
                if(this.editando !== null) {
                    // Actualizar contacto existente
                    Vue.set(this.personas, this.editando, {...this.nuevo});
                    this.cancelarEdicion();
                } else {
                    // Añadir nuevo contacto
                    this.personas.push({...this.nuevo});
                    this.nuevo.nombre = '';
                    this.nuevo.email = '';
                    this.nuevo.telefono = '';
                }
                this.generarJSONLDContactos();
            } else {
                alert("Por favor completa todos los campos.");
            }
        },
        eliminarPersona(index) {
            if(confirm("¿Deseas eliminar este contacto?")) {
                this.personas.splice(index, 1);
                if(this.editando === index) {
                    this.cancelarEdicion();
                }
                this.generarJSONLDContactos();
            }
        },
        editarPersona(index) {
            this.editando = index;
            this.nuevo = {...this.personas[index]};
            
        },
        cancelarEdicion() {
            this.editando = null;
            this.nuevo = { nombre: '', email: '', telefono: '' };
            
        },
        //Genera JSON-LD DINAMICO
        generarJSONLDContactos() {

            // eliminar JSON-LD previo si existe
            const old = document.getElementById("jsonld-contactos");
            if (old) old.remove();

            const contactosJSON = this.personas.map(p => ({
                "@type": "Person",
                "name": p.nombre,
                "email": p.email,
                "telephone": p.telefono
            }));

            const data = {
                "@context": "https://schema.org",
                "@graph": contactosJSON
            };

            const script = document.createElement("script");
            script.type = "application/ld+json";
            script.id = "jsonld-contactos";
            script.textContent = JSON.stringify(data, null, 2);

            document.head.appendChild(script);
        }
    },

    mounted() {
        // generar JSON-LD al cargar la página
        this.generarJSONLDContactos();
    }
    
});
