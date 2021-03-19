/**Imports */
import AddTodo from './components/addTodo.js';
import Modal from './components/modal.js';
import Filters from './components/filters.js';
export default class View {
    constructor() {
        this.model = null;
        /**Tabla de la Lista */
        this.table = document.getElementById('table');
        /**Instanciamos el AddTodo */
        this.addTodoForm = new AddTodo();
        /**Instanciamos el Modal */
        this.modal = new Modal();
        /**Instanciamos el Filters */
        this.filters = new Filters();
        this.addTodoForm.onClick((title, description) => this.addTodo(title, description))
        this.modal.onClick((id, values) => this.editTodo(id, values));
        this.filters.onClick((filters) => this.filter(filters));
    }
    /**Setter
     * Model
     */
    setModel(model) {
        this.model = model;
    }
    /**Obtiene los datos del modelo */
    render() {
        const todos = this.model.getTodos();
        /**creamos una fila para cada TODO */
        todos.forEach((todo) => this.createRow(todo));
    }
    /**Agregar TODO a la Lista
     * 
     */
    addTodo(title, description) {
        const todo = this.model.addTodo(title, description);
        this.createRow(todo);
    }
    /**Para llamar al método del modelo */
    toggleCompleted(id) {
        this.model.toggleCompleted(id);
    }
    /**Llama al método del modelo */
    editTodo(id, values) {
        this.model.editTodo(id, values);
        const row = document.getElementById(id);
        row.children[0].innerText = values.title;
        row.children[1].innerText = values.description;
        row.children[2].children[0].checked = values.completed;
    }
    /**Para eliminar un fila de la tabla recibe el DI */
    removeTodo(id) {
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }
    /**Llama al método de filtros */
    filter(filters) {
        /**Destructing */
        const { type, words } = filters;
        /**Obtenemos todos las filas y hacemos un Destructing */
        const [, ...rows] = this.table.getElementsByTagName('tr');
        for (const row of rows) {
            const [title, description, completed] = row.children;
            /**Para ocultar la fila */
            let shouldHide = false;
            if (words) {
                shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
            }
            /**Para buscar los completos */
            const shouldBeCompleted = type === 'completed';
            const isCompleted = completed.children[0].checked;

            if (type !== 'all' && shouldBeCompleted !== isCompleted) {
                shouldHide = true;
            }
            /**Para Ocultar las filas */
            if (shouldHide) {
                row.classList.add('d-none');
            } else {
                row.classList.remove('d-none');
            }
        }
    }
    /**Para crear un a fila a la tabla recibe el objeto TODO*/
    createRow(todo) {
        /**Agregamos una fila a tabla */
        const row = table.insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
        <td>${todo.title}</td>
        <td>${todo.description}</td>
        <td class="text-center">
        </td>
        <td class="text-right">
      </td>`;
        /**Checkbox */
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        /**Agregamos a la columna 2 el checkbox */
        row.children[2].appendChild(checkbox);
        /**Creamos el botón de editar */
        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1');
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
        /**Agregamos los atributos para que abra el modal */
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');
        /**Agregamos a la columna 3 el botón de eliminar */
        row.children[3].appendChild(editBtn);
        /**Acción botón eliminar */
        editBtn.onclick = () => this.modal.setValues({
            id: todo.id,
            title: row.children[0].innerText,
            description: row.children[1].innerText,
            completed: row.children[2].children[0].checked,
        });
        /**Creamos el botón de eliminar */
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        /**Agregamos a la columna 3 el botón de eliminar */
        row.children[3].appendChild(removeBtn);
        /**Acción botón eliminar */
        removeBtn.onclick = () => this.removeTodo(todo.id);
    }
}