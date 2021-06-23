import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBBtnGroup, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit'
import { getQuestions, removeQuestion } from '_redux/actions/questions.actions'
import Navigation from '../layout/Navigation'


const Profile = () => {
    const { questions, loading: isLoading } = useSelector(state => state.questions)
    const dsp = useDispatch()

    useEffect(() => {
        dsp(getQuestions())
    }, [])

    const removeHandler = e => dsp(removeQuestion(e.target.getAttribute('data-id')))

    return (
        <div>
            <Navigation />

            <div className="container">
                <MDBBreadcrumb className="my-4">
                    <MDBBreadcrumbItem>
                        <Link to="/">Home</Link>
                    </MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>
                        Profile
                    </MDBBreadcrumbItem>
                </MDBBreadcrumb>

                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Question</th>
                            <th scope="col">Author</th>
                            <th scope="col"></th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {/* TODO: Add loader */}
                        {
                            isLoading ? <h1>Loading...</h1> : questions.map((question, index) => (
                                <tr className="align-middle" key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <th>{question.content}</th>
                                    <th>{question.author}</th>
                                    <th className="d-flex justify-content-center">
                                        <MDBBtn color="danger" size="lg" data-id={question.id} onClick={removeHandler}>D</MDBBtn>
                                    </th>
                                </tr>
                            ))
                        }
                    </MDBTableBody>
                </MDBTable>
            </div>
        </div>
    )
}

export default Profile
