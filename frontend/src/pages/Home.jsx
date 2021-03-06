import logo from '../assets/styles/logo/logo.png'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../store/actions/userAction'

export function Home() {
    const dispatch = useDispatch()

    useEffect(() => {
    }, [])

    const runDemo = () => {
        let loggedinUser = {
            isAdmin: false,
            fullname: "Guest Guestis",
            username: "Guest",
            password: "0000",
            email: "Guest@gmail.com",
            phoneNumber: "0524735510",
            birthday: "20/02/2000",
            company: "Mister Bit.",
        }
        sessionStorage.setItem('loggedinUser', JSON.stringify(loggedinUser))
        dispatch(login(loggedinUser))
    }

    return (
        <section className="home flex col" >
            <div className="home-header flex start align-center">
                <Link to="/login" title="Login">Login</Link>
                {/* <Link to="/login" title="Sign-Up">Sign-Up</Link> */}
            </div>
            <div className="home-main flex">
                <div className="first-panel flex col center align-start">
                    <h1>Join the future</h1>
                    <p>
                        The next step in multi-planning and productivity!
                         <br />
                        <span>Sheny</span> will help you keep track of hundreds of tasks.
                        <br />
                        An efficient way to manage your co-workers / employees.
                        <br />
                        Half the hassle, twice the fun.
                    </p>
                    <Link to="/board" title="Demo" onClick={() => runDemo()}><button>Start Here!</button></Link>

                </div>
                <div className="second-panel">
                    <img src={logo} alt="Logo" />
                </div>
            </div>
        </section>
    )
}
