import axios from 'axios'

class TodoService{
    RetrieveAllTodos(name){
        return axios.get(`http://localhost:8080/users/${name}/todos`);
    }
    RetrieveTodo(name,id){
        return axios.get(`http://localhost:8080/users/${name}/todos/${id}`);
    }
    deleteTodos(name,id){
        return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`);
    }
    updateTodos(name,id,todo){
        return axios.put(`http://localhost:8080/users/${name}/todos/${id}`,todo);
    }
    createTodos(name,todo){
        return axios.post(`http://localhost:8080/users/${name}/todos/`,todo);
    }
    
}
export default new TodoService()