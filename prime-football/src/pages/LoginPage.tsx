import './pageStyling.css'
import { DB_USERS } from "../shared/db"
import { authenticate } from '../shared/api'

export default function LoginPage() {

    function login(index: number) {
        authenticate().then(response => {
            localStorage.setItem('token', 'Bearer ' + response.idToken)
            sessionStorage.setItem("userId", DB_USERS[index].id)
            window.location.href = "/"
        })
    }

    return (
        <div className="login-page-content">
            <h3 className="login-page-content-title">Login as one of the following users</h3>
            <ul className='login-page-content-users-list'>
                {DB_USERS.map((user, key) => {
                    return <div className="login-page-content-users-list-user button" key={key} id={'user-' + user.username.substring(1)} onClick={() => login(key)}>{user.username}</div>
                })}
            </ul>
        </div>
    )
}