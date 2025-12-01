new Vue({
    el: '#app',
    data: {
        personas: [
            { nombre: "Juan Pérez", email: "juan@example.com", telefono: "123456789" },
            { nombre: "Ana Gómez", email: "ana@example.com", telefono: "987654321" }
        ],
        nuevo: { nombre: '', email: '', telefono: '' },
        editando: null,
        busqueda: '',
        ordenarPor: 'nombre'
    },

    computed: {
        contactosFiltrados() {
            let resultado = [...this.personas];

            if (this.busqueda) {
                const term = this.busqueda.toLowerCase();
                resultado = resultado.filter(p =>
                    p.nombre.toLowerCase().includes(term) ||
                    p.email.toLowerCase().includes(term) ||
                    p.telefono.toLowerCase().includes(term)
                );
            }

            if (this.ordenarPor === 'nombre') {
                resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
            }

            return resultado;
        }
    },

    methods: {
        agregarPersona() {
            if (this.nuevo.nombre && this.nuevo.email && this.nuevo.telefono) {
                if (this.editando !== null) {
                    this.$set(this.personas, this.editando, { ...this.nuevo });
                    this.cancelarEdicion();
                } else {
                    this.personas.push({ ...this.nuevo });
                }
                this.nuevo = { nombre: '', email: '', telefono: '' };
                this.generarJSONLDContactos();
            } else {
                alert("Por favor completa todos los campos.");
            }
        },

        eliminarPersona(index) {
            if (confirm("¿Deseas eliminar este contacto?")) {
                this.personas.splice(index, 1);
                if (this.editando === index) this.cancelarEdicion();
                this.generarJSONLDContactos();
            }
        },

        editarPersona(index) {
            this.editando = index;
            this.nuevo = { ...this.personas[index] };
        },

        cancelarEdicion() {
            this.editando = null;
            this.nuevo = { nombre: '', email: '', telefono: '' };
        },

        generarJSONLDContactos() {
            const script = document.getElementById("jsonld-contactos");
            if (!script) return;

            const data = {
                "@context": "https://schema.org",
                "@graph": this.personas.map(p => ({
                    "@type": "Person",
                    "name": p.nombre,
                    "email": p.email,
                    "telephone": p.telefono
                }))
            };

            script.textContent = JSON.stringify(data, null, 2);
            console.log("JSON-LD actualizado:", data);
        }
    },

    mounted() {
        console.log("VUE INICIADO");
        this.generarJSONLDContactos();
    }
});