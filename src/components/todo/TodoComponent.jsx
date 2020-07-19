import React, { Component } from 'react';
import AuthenticationService from '../../components/todo/AuthenticationService'
import TodoService from '../../api/todo/TodoService.js'
import moment from 'moment'

class TodoComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            todo:[],
            message: null 
        }
        this.addTodoClicked=this.addTodoClicked.bind(this);
        this.deleteTodoClicked=this.deleteTodoClicked.bind(this);
        this.updateTodoClicked=this.updateTodoClicked.bind(this);
        this.refreshTodos=this.refreshTodos.bind(this);
    }
    componentDidMount(){
        console.log("componentDidMount")
        
        this.refreshTodos();
    }
    addTodoClicked(){
        this.props.history.push(`/todos/-1`)
    }
    deleteTodoClicked(id){
        let username=AuthenticationService.getLoggedinUserName();
        TodoService.deleteTodos(username,id)
        .then
            (
                response => {
                    this.setState({message: `Delete of todo ${id} successful.`})
                    this.refreshTodos();
                }
                
            )

    }
    updateTodoClicked(id){
        this.props.history.push(`/todos/${id}`)

    }
    refreshTodos(){
        let username=AuthenticationService.getLoggedinUserName();
        TodoService.RetrieveAllTodos(username)
        .then
            (
                response => {
                    this.setState({todo: response.data})
                }
                
            )
    }
    render(){
        return (
        <div>
            <h1>My Todo List</h1>
            <div className="alert alert-success">{this.state.message}</div>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Completed?</th>
                            <th>Target Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.todo.map(
                            todos =>
                            <tr key={todos.id}>
                                <td>{todos.description}</td>
                                <td>{todos.completed.toString()}</td>
                                <td>{moment(todos.targetDate.toString()).format('YYYY-MM-DD')}</td>
                                <td><button className="btn btn-success" onClick={()=> this.updateTodoClicked(todos.id)}>Update</button></td>
                                <td><button className="btn btn-warning" onClick={()=> this.deleteTodoClicked(todos.id)}>Delete</button></td>
                               
                            </tr>
                        )
                        }
                    </tbody>
                </table>
                <div className="row">
                <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                </div>
                
            </div>
        </div>
        )
    }
}
export default TodoComponent