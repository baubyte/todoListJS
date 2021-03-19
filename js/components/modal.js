/**Imports */
import Alert from './alert.js';
export default class Modal {
    constructor() {
        /**Botón Agregar */
        this.btn = document.getElementById('modal-btn');
        /**Inputs
         * title
         * description
         * completed
         */
        this.title = document.getElementById('modal-title');
        this.description = document.getElementById('modal-description');
        this.completed = document.getElementById('modal-completed');
        this.todo=null;
        this.alert = new Alert('modal-alert');
    }
     /**Método para capturar y agregar a los inputs del modal */
     setValues(todo){
        this.todo = todo;
        this.title.value = todo.title;
        this.description.value = todo.description;
        this.completed.checked = todo.completed;
     }
    /**Método para capturar los eventos mediante un callback */
    onClick(callback) {
        this.btn.onclick = () => {
            /**Comprobamos que los campos no estén vacíos */
            if (!this.title.value || !this.description.value) {
                this.alert.show('El Titulo y la Descripción son necesarios.');
                return;
            }
            /**Ocultamos el modal */
            $('#modal').modal('toggle');
            /**Pasamos los datos al callback */
            callback(this.todo.id,{
                title: this.title.value,
                description: this.description.value,
                completed: this.completed.checked,
            });
        }
    }
}