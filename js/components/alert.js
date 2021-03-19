export default class Alert{
    constructor(alertId){
        /**Alerta para los Errores */
        this.alert = document.getElementById(alertId);
    }
    /**Mostrar el Alert con el mensaje */
    show(message){
        this.alert.classList.remove('d-none');
        this.alert.innerText = message;
    }
    /**Oculta el Alert */
    hide(){
        this.alert.classList.add('d-none');
    }
}