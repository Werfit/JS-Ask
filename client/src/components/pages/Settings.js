import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBInput } from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom'
import { getProfile, updateProfile } from '_redux/actions/profile.actions'

import Navigation from '../layout/Navigation'

const Settings = () => {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', birthDate: '1970-01-01' })
    const profile = useSelector(state => state.profile)

    const dsp = useDispatch()

    useEffect(() => dsp(getProfile()), [])

    useEffect(() => setForm({
        ...form,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        birthDate: profile.birthDate
    }), [profile])

    const handleForm = e => setForm({
        ...form,
        [e.target.name]: e.target.value
    })

    const handleUpdate = e => {
        e.preventDefault()

        dsp(updateProfile(form))
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
                        Settings
                    </MDBBreadcrumbItem>
                </MDBBreadcrumb>

                <form onSubmit={handleUpdate}>
                    <MDBInput type="text" name="firstName" label="First name" className="mb-3"
                        value={form.firstName} onChange={handleForm}
                    />
                    <MDBInput type="text" name="lastName" label="Last name" className="mb-3"
                        value={form.lastName} onChange={handleForm}
                    />
                    <MDBInput type="email" name="email" label="Email" className="mb-3"
                        value={form.email} onChange={handleForm}
                    />
                    <MDBInput type="date" name="birthDate" label="Birth date" className="mb-3"
                        value={form.birthDate} onChange={handleForm}
                    />

                    <MDBBtn color="success" type="submit">Save</MDBBtn>
                </form>
            </div>
        </div>
    )
}

export default Settings
