import React, { useEffect, createContext, useReducer, useContext } from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Signin from './components/screens/SignIn'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import { reducer, initialState } from './reducers/userReducer'
import Reset from './components/screens/Reset'
import NewPassword from './components/screens/Newpassword'
import Edit from './components/screens/EditPost';
import ContactsHome from './components/screens/ContactsHome';
import Home from './components/screens/Home.jsx';
export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })
    } else {
      if (!history.location.pathname.startsWith('/reset'))
        history.push('/signin')
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/" >
        <Home />
      </Route>

      <Route exact path="/contacts" >
        <ContactsHome />
      </Route>

      <Route path="/signin">
        <Signin />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route exact path="/profile">
        <ContactsHome />
      </Route>

      <Route path="/create">
        <CreatePost />
      </Route>

      <Route path="/updatecontact/:postid">
        <Edit />
      </Route>


      <Route exact path="/reset">
        <Reset />
      </Route>

      <Route path="/reset/:token">
        <NewPassword />
      </Route>

    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />

      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
