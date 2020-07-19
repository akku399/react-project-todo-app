import React, { Component } from 'react';
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TodoService from '../../api/todo/TodoService.js'
import AuthenticationService from '../todo/AuthenticationService.js'
class TodoUpdateComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.id,
            description:'',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit=this.onSubmit.bind(this)
        this.validate=this.validate.bind(this)
      }
    componentDidMount(){
        if(this.state.id === -1) 
            return
        let username=AuthenticationService.getLoggedinUserName();
        TodoService.RetrieveTodo(username,this.state.id)
            .then(response => this.setState({
                description:response.data.description,
                targetDate:moment(response.data.targetDate).format('YYYY-MM-DD')
            }

            ))
    }

    onSubmit(values){
        let username = AuthenticationService.getLoggedinUserName();
        let todo ={
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }
        if(this.state.id === -1) {
            TodoService.createTodos(username, todo)
                .then(() => this.props.history.push('/todos'))
        } else {
            
            TodoService.updateTodos(username, this.state.id,todo)
                .then(() => this.props.history.push('/todos'))
        }
    }
    validate(values){
        let errors={}
        if(!values.description)
            errors.description='Enter a Description'
        else if(values.description.length<5)
            errors.description='Enter atleast 5 characters in Description'
        if(!moment(values.targetDate).isValid())
            errors.targetDate='Enter a valid Target Date'
        return errors

    }
    render(){
        let {description,targetDate}=this.state
        //let targetDate=this.state.targetDate
        return(
            <div>
                <h1>My Todo</h1>
                <Formik 
                initialValues={{description,targetDate}}
                onSubmit={this.onSubmit}
                validate={this.validate}
                validateOnChange={false}
                validateOnBlur={false}
                enableReinitialize={true}>
                    
                    {
                    (props)=> (
                        <Form>
                            <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field className="form-control" type="text" name="description"/>
                            </fieldset>

                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field className="form-control" type="date" name="targetDate"/>
                            </fieldset>
                            <button className="btn btn-success">Save</button>
                        </Form>
                    )
                    }
                </Formik>
            </div>
        )
    }
}
export default TodoUpdateComponent