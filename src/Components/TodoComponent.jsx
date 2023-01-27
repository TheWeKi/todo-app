
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "../api/apiService";
import { ErrorMessage, Field, Form, Formik } from "formik";


function TodoComponent() {
    const authContext = useAuth()
    const username = authContext.username;

    const { id } = useParams()

    const navigate = useNavigate()

    const [description, setDescripton] = useState('')
    const [targetDate, setTargetDate] = useState('')

    useEffect(
        () => retrieveTodo(),
        // eslint-disable-next-line
        [id]
    )

    const retrieveTodo = () => {    
        if( id/1 !== -1 ) {
            retrieveTodoApi(username, id)
                .then( (response) => {
                    setDescripton(response.data.description)
                    setTargetDate(response.data.targetDate)
                } )
                .catch( (e) => console.log(e) )
        }
    }

    const validate = (values) => {
        let errors = {}

        if(values.description.length < 4) errors.description = 'Must be greater than 3 letters'
        if(values.targetDate === '' || values.targetDate === null)
            errors.targetDate = 'Target date must be provided'

        return errors;
    }

    const onSubmit = (values) => {

        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }

        if( id/1 === -1 ) {
            createTodoApi(username, todo)
                .then( () => navigate('/todos') )
                .catch( e => console.log(e) )
        } else {
            updateTodoApi(username, id, todo)
                .then( () => navigate('/todos') )
                .catch( e => console.log(e) )
        }
    }

    return (
        <div className="container text-center">
            <Formik initialValues={ {description, targetDate} } enableReinitialize={true}
                onSubmit={onSubmit}
                validate={validate} validateOnBlur={false} validateOnChange={false}
            >   
                <Form >

                    <ErrorMessage className="alert alert-warning" component='div' name="description" />
                    <ErrorMessage className="alert alert-warning" component='div' name="targetDate" />

                    <fieldset className="form-group">
                        <label htmlFor="description">Description</label>
                        <Field type="text" name="description" id="description" className="form-control" />
                    </fieldset>
                    <br />
                    <fieldset className="form-group">
                        <label htmlFor="targetDate">Target Date</label>
                        <Field type="date" name="targetDate" id="targetDate" className="form-control" />
                    </fieldset>
                    <br />

                   <button type="submit" className="btn btn-success m-5 py-2 px-5 fw-bold"> 
                        Save
                    </button>

                </Form>      
            </Formik>
        </div>
    )
}

export { TodoComponent }
