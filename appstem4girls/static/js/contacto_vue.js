new Vue({
    el: '#app',
    data: {
        personas: contactos,  // <-- usar contactos del JS externo
        nuevo: { nombre: '', email: '', telefono: '' },
        editando: null,
        busqueda: '',
        ordenarPor: 'nombre'
    },
    methods: {
        agregarPersona() {
            if (this.nuevo.nombre && this.nuevo.email && this.nuevo.telefono) {
                if (this.editando !== null) {
                    this.$set(this.personas, this.editando, { ...this.nuevo });
                    this.cancelarEdicion();
                } else {
                    this.personas.push({ ...this.nuevo });
                    contactos.push({ ...this.nuevo }); // <-- actualizar JS externo también
                }
                this.nuevo = { nombre: '', email: '', telefono: '' };
                generarJSONLD(); // <-- actualizar JSON-LD
            } else {
                alert("Completa todos los campos.");
            }
        },
        eliminarPersona(index) {
            if (confirm("¿Deseas eliminar este contacto?")) {
                this.personas.splice(index, 1);
                contactos.splice(index, 1); // <-- actualizar JS externo
                generarJSONLD();
            }
        }
    },
    mounted() {
        console.log("Vue iniciado con contactos externos:", this.personas);
    }
});
