import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownItem, MDBDropdownDivider, MDBDropdownMenu, MDBDropdownLink, MDBCollapse, MDBNavbarToggler } from 'mdb-react-ui-kit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { logoutUser } from '_redux/actions/accounts.actions'

const Navigation = () => {
    const [navbarShow, setNavbarShow] = useState(false)
    const { user, isAuthenticated } = useSelector(state => state.accounts)
    const dsp = useDispatch()

    const navLinks = (
        <>
            <Link to="/" className="navbar-brand mb-0 h1">Ask</Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <div className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </div>
                <div className="nav-item">
                    <Link to="/search/" className="nav-link">Search</Link>
                </div>
            </ul>
        </>
    )

    const logoutHandler = () => dsp(logoutUser())

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
            <div className="container-fluid">
                <MDBNavbarToggler
                    type="button"
                    onClick={() => setNavbarShow(!navbarShow)}
                >
                    <FontAwesomeIcon icon={faBars} />
                </MDBNavbarToggler>

                <MDBCollapse navbar>
                    {navLinks}
                </MDBCollapse>

                {
                    !isAuthenticated ? <Link to="/authentication/"><MDBBtn color="primary">Log in</MDBBtn></Link>
                        : (
                            <MDBDropdown dropleft group>
                                <MDBDropdownToggle>{user.username}</MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem />
                                    <MDBDropdownItem>
                                        <Link to="/profile/">
                                            <MDBDropdownLink tag="button" type="button">
                                                Profile
                                        </MDBDropdownLink>
                                        </Link>
                                    </MDBDropdownItem>
                                    <MDBDropdownDivider />
                                    <MDBDropdownItem>
                                        <Link to="/settings/">
                                            <MDBDropdownLink tag="button" type="button">
                                                Settings
                                        </MDBDropdownLink>
                                        </Link>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <Link to="/change/">
                                            <MDBDropdownLink tag="button" type="button">
                                                Change password
                                        </MDBDropdownLink>
                                        </Link>
                                    </MDBDropdownItem>
                                    <MDBDropdownDivider />
                                    <MDBDropdownItem>
                                        <MDBDropdownLink tag="button" type="button" onClick={logoutHandler}>
                                            Logout
                                        </MDBDropdownLink>
                                    </MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        )
                }
            </div>
            <div className="justify-content-center">
                <MDBCollapse show={navbarShow}>
                    {navLinks}
                </MDBCollapse>
            </div>
        </nav>
    )
}

export default Navigation
