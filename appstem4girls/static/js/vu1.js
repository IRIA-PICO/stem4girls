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
        }
    },
    methods: {
        agregarPersona() {
            // Validar campos
            if(this.nuevo.nombre && this.nuevo.email && this.nuevo.telefono){
                // Añadir nuevo contacto
                this.personas.push({...this.nuevo});
                // Limpiar formulario
                this.nuevo.nombre = '';
                this.nuevo.email = '';
                this.nuevo.telefono = '';
            } else {
                alert("Por favor completa todos los campos.");
            }
        },
        eliminarPersona(index) {
            if(confirm("¿Deseas eliminar este contacto?")){
                this.personas.splice(index, 1);
            }
        }
    }
});