import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBCheckbox, MDBInput } from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom'

import { askQuestion } from '_redux/actions/questions.actions'

import Navigation from '../layout/Navigation'

const NewQuestion = ({ match }) => {
    const dsp = useDispatch()
    const isAuthenticated = useSelector(state => state.accounts.isAuthenticated)
    const [form, setForm] = useState({ question: '', isAnonymous: true })

    const formValuesHandler = e => {
        if (e.target.name === 'isAnonymous') {
            if (isAuthenticated)
                setForm({ ...form, isAnonymous: !form.isAnonymous })
            else
                alert('You have to be logged to change the field')
        } else {
            setForm({ ...form, question: e.target.value })
        }
    }

    const formHandler = e => {
        e.preventDefault()

        dsp(askQuestion(form, match.params.target))
        setForm({ question: '', isAnonymous: true })
    }

    return (
        <div>
            <Navigation />

            <div className="container">
                <MDBBreadcrumb className="my-4">
                    <MDBBreadcrumbItem>
                        <Link to="/">Home</Link>
                    </MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>
                        Question
                    </MDBBreadcrumbItem>
                </MDBBreadcrumb>

                <form onSubmit={formHandler}>
                    <div className="mb-3">
                        <MDBInput
                            type="text" name="question" label="Question" required
                            value={form.question} onChange={formValuesHandler}
                        />
                        <div className="form-text">Question is asked anonymously by default. But you can change it lower.</div>
                    </div>
                    <div className="mb-3">
                        <MDBCheckbox
                            name="isAnonymous" id="isAnonymous" label="Anonymously" checked
                            checked={form.isAnonymous} onChange={formValuesHandler
                            } />
                    </div>
                    <MDBBtn color="success" type="submit">Ask</MDBBtn>
                </form>
            </div>
        </div>
    )
}

export default NewQuestion
