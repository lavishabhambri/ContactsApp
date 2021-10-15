import React, { useContext, useRef, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'
import "./../css/navbar.css"

const NavBar = () => {
  const [userDetails, setUserDetails] = useState([])
  const { state, dispatch } = useContext(UserContext)
  const history = useHistory()
  useEffect(() => {

  }, [])
  const renderList = () => {
    if (state) {
      return [
        <li key="2"><Link to="/profile" style={{ textDecoration: "none", fontSize: "17px" }}>Profile</Link></li>,
        <li key="3"><Link to="/create" style={{ textDecoration: "none", fontSize: "17px" }}>Create Contact</Link></li>,
        <li key="5">
          <button className="btn #c62828 btn-primary darken-3"
            style={{ margin: " auto 12px auto 2px" }}
            onClick={() => {
              localStorage.clear()
              dispatch({ type: "CLEAR" })
              history.push('/signin')
            }}
          >
            Logout
          </button>
        </li>


      ]
    } else {
      return [
        <li key="6"><Link to="/signin" style={{ textDecoration: "none", fontSize: "17px" }}>SignIn</Link></li>,
        <li key="7"><Link to="/signup" style={{ textDecoration: "none", fontSize: "17px" }}>SignUp</Link></li>

      ]
    }
  }

  return (
    <nav>
      <div className="nav-wrapper" style={{ backgroundColor: "#EEC1BC" }}>
        <Link to="/" className="brand-logo left" style={{ marginLeft: "4.2%", textDecoration: "none" }} ><span style={{ color: "#2E357E" }}>Phone Pocket</span></Link>
        <ul id="nav-mobile" className="right">
          {renderList()}

        </ul>
      </div>
    </nav>


  )
}


export default NavBar