import React, { useState, useContext, } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import M from 'materialize-css'
import loginImage from "./../../images/contactList1.png"

const SignIn = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const [password, setPasword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "invalid email", classes: "#c62828 red darken-3" })
            return
        }
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({ type: "USER", payload: data.user })
                    M.toast({ html: "signedin success", classes: "#43a047 green darken-1" })
                    history.push('/')
                }
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <div>
                <img src={loginImage} className="login-image"></img>
            </div>
            <div className="mycard">
                <div className="card auth-card input-field">
                    <h2 style={{ fontFamily: "sans-serif" }}>Phone Pocket Login</h2>
                    <input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPasword(e.target.value)}
                    />
                    <button className="btn btn-success waves-effect waves-light #64b5f6 darken-1"
                        onClick={() => PostData()}
                        style={{ margin: "20px auto", width: "100%" }}
                    >
                        <span style={{ color: "#fff" }}>Login</span>
                    </button>
                    <h5>
                        <Link to="/signup" className="links-text">Don't have an account?</Link>
                    </h5>
                    <h6>
                        <Link to="/reset" className="links-text">Forgot password?</Link>
                    </h6>

                </div>
            </div>
        </div>
    )
}


export default SignIn