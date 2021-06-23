const { MDBTypography } = require("mdb-react-ui-kit")

// TODO: Alerts; MDBModal
const Alert = color => {
    return (
        <div className="alert">
            <MDBTypography note noteColor={color}>
                Just testing
            </MDBTypography>
        </div>
    )
}

export default Alert
