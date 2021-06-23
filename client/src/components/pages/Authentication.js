import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { MDBInput, MDBBtn, MDBBtnGroup } from 'mdb-react-ui-kit'

import { authenticateUser } from '_redux/actions/accounts.actions'
import 'styles/accounts.css'

const Authentication = () => {
    const [form, setForm] = useState({ username: '', password: '' })
    const dsp = useDispatch()

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (register = false) => dsp(authenticateUser({ user: form, register }))

    return (
        <div className="container-fluid" id="authenticationPage">
            <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header text-center">
                            Log in
                        </div>
                        <div className="card-body">
                            <form>
                                <MDBInput label="Username" name="username" className="mb-4" onChange={handleChange} value={form.username} />
                                <MDBInput label="Password" name="password" className="mb-4" type="password" onChange={handleChange} value={form.password} />

                                <MDBBtnGroup className="d-flex">
                                    <MDBBtn onClick={() => handleSubmit()} type="submit">Login</MDBBtn>
                                    <MDBBtn onClick={() => handleSubmit(true)} outline color="primary">Sign up</MDBBtn>
                                </MDBBtnGroup>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication
