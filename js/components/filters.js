export default class Filters {
    constructor() {
        /**Obtenemos todo el form */
        this.form = document.getElementById('filters');
        /**Botón Agregar */
        this.btn = document.getElementById('search');
    }

    /**Método para capturar los eventos mediante un callback */
    onClick(callback){
        this.btn.onclick = (e)=>{
            /**capturamos el evento */
            e.preventDefault();
            /**capturamos los datos del form */
            const data = new FormData(this.form);
            callback({
                type:data.get('type'),
                words:data.get('words'),
            });
        }
    }
}