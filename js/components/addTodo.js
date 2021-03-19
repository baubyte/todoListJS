/**Imports */
import Alert from './alert.js';
export default class AddTodo {
    constructor() {
        /**Botón Agregar */
        this.btn = document.getElementById('add');
        /**Inputs
         * title
         * description
         */
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');
        this.alert = new Alert('alert');
    }

    /**Método para capturar los eventos mediante un callback */
    onClick(callback) {
        this.btn.onclick = () => {
            /**Comprobamos que los campos no estén vacíos */
            if (title.value === '' || description.value === '') {
                this.alert.show('El Titulo y la Descripción son necesarios.');
            } else {
                this.alert.hide();
                callback(this.title.value, this.description.value);
            }
        }
    }
}