import './componentStyling.css'

export default function Header() {
    function logOut() {
        sessionStorage.removeItem("userId")
        window.location.href = "/"
    }
    return (
        <div className="header">
            <div className="header-left button">
                <h3 onClick={() => { window.location.href = "/" }}>PRIME FOOTBALL</h3>
            </div>
            <div className="header-right">
                <div className='button' id='profile-button' onClick={() => { window.location.href = "/profile" }}>Profile</div>
                <div className='button' id='logout-button' onClick={logOut} >Logout</div>
            </div>
        </div>
    )
}
