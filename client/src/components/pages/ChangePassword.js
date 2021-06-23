import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBInput } from 'mdb-react-ui-kit'

import { changePassword } from '_redux/actions/accounts.actions'

import Navigation from '../layout/Navigation'

const ChangePassword = () => {
    const [form, setForm] = useState({ currentPassword: '', newPassword: '' })
    const dsp = useDispatch()

    const handleForm = e => setForm({
        ...form,
        [e.target.name]: e.target.value
    })

    const handleSubmit = e => {
        e.preventDefault()

        dsp(changePassword(form))
        setForm({ currentPassword: '', newPassword: '' })
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
                        Change password
                    </MDBBreadcrumbItem>
                </MDBBreadcrumb>

                <form onClick={handleSubmit}>
                    <MDBInput type="password" name="currentPassword" label="Current password" className="mb-3"
                        value={form.currentPassword} onChange={handleForm}
                    />
                    <MDBInput type="password" name="newPassword" label="New password" className="mb-3"
                        value={form.newPassword} onChange={handleForm}
                    />
                    <MDBBtn type="submit" color="success">Change</MDBBtn>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword
