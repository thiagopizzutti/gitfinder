import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Alert  from './components/layout/Alert';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users';
import Search from './components/users/Search';

import axios from 'axios';

import "./App.css"
import About from './components/pages/About';
import User from './components/users/User';


const App = () => {
  const [users, setUsers] = useState([])
  const [repos, setRepos] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)
  
  const searchUsers = async (text) => {
    setLoading( true ) 
    
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      
   
    setUsers( res.data.items )
    setLoading( false )
  }

  const getSingleUser = async (username) => {
    setLoading( true )
    
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
   
    setUser( res.data )
    setLoading( false )
  }

  const getUserRepos = async (username) => {
     setLoading( true ) 
    
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=20&sort=created:asc&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
   
    setRepos( res.data )
    setLoading( false )
  }

   const clearUsers = () => {
     setUsers([])
     setLoading(true)
   }
  
    const handleAlert = (msg, type) => {
     setAlert({msg, type})


    setTimeout(() => {
      setAlert(null)
      }, 3000);
   }
   

    return (
    
    <Router>
      <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route exact path='/' render={props => (
              <>
                <Search
                searchUsers={searchUsers}
                clearUsers={clearUsers}
                showClear={users.length > 0 ? true : false}
                handleAlert={handleAlert}/>
            
                <Users loading={loading} users={users}/>
              </>
            )}>              
            </Route>
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User
                {...props}
                getSingleUser={getSingleUser}
                getUserRepos={getUserRepos}
                user={user}
                repos={repos}              
                loading={loading}
              />
            )} />          
          </Switch>          
      </div>
    </Router>   
  );
  
}

export default App;
