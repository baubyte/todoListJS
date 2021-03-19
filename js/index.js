/**Imports */
import Model from './model.js';
import View from './view.js';
/**Para no ejecutar el JS hasta el el HTML  este completamente cargado */
document.addEventListener('DOMContentLoaded', ()=> {
    const model = new Model();
    const view = new View();
    view.setModel(model);
    view.render();
});