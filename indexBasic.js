/**Para no ejecutar el JS hasta el el HTML  este completamente cargado */
document.addEventListener('DOMContentLoaded',function () {
/**Botón Agregar */
const btn = document.getElementById('add');
/**Inputs
 * title
 * description
 */
 const title = document.getElementById('title');
 const description = document.getElementById('description');
/**Tabla de la Lista */
const table = document.getElementById('table');
/**Alerta para los Errores */
const alert = document.getElementById('alert');
/**ID para las Filas */
let id = 1;

/**Eliminar de la Lista */
function removeTodo(id) {
    document.getElementById(id).remove();
}

/**Agregar a la Lista */
function addTodo() {
    /**Comprobamos que los campos no estén vacíos */
    if (title.value === '' || description.value === '') {
        alert.classList.remove('d-none');
        alert.innerText = 'El Titulo y la Descripción son necesarios.';
        return;
    }
    alert.classList.add('d-none');
    /**Agregamos una fila a tabla */
    const row = table.insertRow();
    row.setAttribute('id',id++);
    row.innerHTML = `
        <td>${title.value}</td>
        <td>${description.value}</td>
        <td class="text-center">
        <input type="checkbox">
        </td>
        <td class="text-right">
            <button class="btn btn-primary mb-1">
                <i class="fa fa-pencil"></i>
            </button>
      </td>
    `;
    /**Creamos el botos de eliminar */
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
    /**Agregamos a la columna 3 el botón de eliminar */
    row.children[3].appendChild(removeBtn);
    /**Acción botón eliminar */
    removeBtn.onclick = function (e) {
        removeTodo(row.getAttribute('id'));
    }
}
/**Llamamos a la Función para agregar a la lista */
btn.onclick = addTodo;
})
