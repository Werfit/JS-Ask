import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit'
import { findUser, clearList } from '_redux/actions/search.actions'

import Navigation from '../layout/Navigation'

const Search = () => {
    const dsp = useDispatch()
    const { list: users } = useSelector(state => state.search)

    const inputHandler = e => dsp(findUser(e.target.value))

    // Clears user list on leaving the page
    useEffect(() => (dsp(clearList())), [])

    return (
        <div>
            <Navigation />

            <div className="container">
                <MDBBreadcrumb className="my-4">
                    <MDBBreadcrumbItem>
                        <Link to="/">Home</Link>
                    </MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>
                        Search
                    </MDBBreadcrumbItem>
                </MDBBreadcrumb>

                <MDBInput type="text" label="Username" size="lg" onChange={inputHandler} />

                {
                    users.map(user => (
                        <MDBCard key={user.id} className="my-4">
                            <MDBCardBody className="d-flex justify-content-between">
                                {user.username}
                                <Link to={`/questions/${user.id}/`}>Ask</Link>
                            </MDBCardBody>
                        </MDBCard>
                    ))
                }
            </div>
        </div>
    )
}

export default Search
