export default class Model {
    constructor() {
        this.view = null;
        this.todos = JSON.parse(localStorage.getItem('todos'));
        if (!this.todos || this.todos.length < 1) {
            this.todos = [{
                id: 0,
                title: 'BAUBYTE',
                description: 'Lista por Hacer.',
                completed: false,
            }];
            this.currentId = 1;
        }else{
            this.currentId = this.todos[this.todos.length - 1].id + 1;
        }
    }
    /**Setter
     * View
     */
    setView(view) {
        this.view = view;
    }
    /**Getter
     * TODO
     */
    getTodos() {
        //return this.todos;
        return this.todos.map((todo) => ({...todo}));
    }
    /**Buscar un TODO */
    findTodo(id) {
        return this.todos.findIndex((todo) => todo.id === id);
    }
    /**Para marcar como completo un TODO*/
    toggleCompleted(id) {
        const index = this.findTodo(id);
        const todo = this.todos[index];
        todo.completed = !todo.completed;
        /**Guardamos */
        this.save();
    }
    /**Agregar TODO a la Lista
     * 
    */
    addTodo(title, description) {
        /**Objeto TODO */
        const todo = {
            id: this.currentId++,
            title,
            description,
            /* Si el valor recibido tiene el mismo 
            * nombre que la propiedad se puede usar lo anterior
            * title: title,
            * description: description,
            */
            completed: false,
        }
        /**Agregamos el TODO Recibido */
        this.todos.push(todo);
        /**
         * Hacemos un clone 
        * return Object.assign({}, todo);
        * o podemos hacer un spreads
        */
        //console.log(this.todos);
        /**Guardamos */
        this.save();
        return { ...todo };
    }
    /**Editar el TODO */
    editTodo(id, values){
        const index = this.findTodo(id);
        Object.assign(this.todos[index], values);
        /**Guardamos */
        this.save();
    }
    /**Elimina un TODO de la lista */
    removeTodo(id) {
        /**Buscamos el id */
        const index = this.findTodo(id);
        //console.log(this.todos[index]);
        /**Eliminamos */
        this.todos.splice(index, 1);
        /**Guardamos */
        this.save();
    }
    /**Guardar los TODO en local storage*/
    save(){
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}