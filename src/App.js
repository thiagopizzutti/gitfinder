import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Alert  from './components/layout/Alert';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users';
import Search from './components/users/Search';

import axios from 'axios';

import "./App.css"
import About from './components/pages/About';
import User from './components/users/User';


class App extends Component {
  state = {
    users: [],
    repos: [],
    user: {},
    loading: false,
    alert: null,
  }
  
  searchUsers = async (text) => {
    this.setState({ loading: true }) 
    
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
   
    this.setState({ users: res.data.items, loading: false })
    
  }

  getSingleUser = async (username) => {
    this.setState({ loading: true }) 
    
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
   
    this.setState({ user: res.data, loading: false })
  }

  getUserRepos = async (username) => {
     this.setState({ loading: true }) 
    
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
   
    this.setState({ repos: res.data, loading: false })
  }

   clearUsers = () => {
    this.setState({users: [], loading: false })
   }
  
    setAlert = (msg, type) => {
     this.setState({alert: {msg, type}})


    setTimeout(() => {
      this.setState({alert: null})
      }, 3000);
   }

  render() {
    const { loading, users, alert, user, repos } = this.state

    return (
    
    <Router>
      <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route exact path='/' render={props => (
              <>
                <Search
                searchUsers={this.searchUsers}
                clearUsers={this.clearUsers}
                showClear={users.length > 0 ? true : false}
                setAlert={this.setAlert}/>
            
                <Users loading={loading} users={users}/>
              </>
            )}>              
            </Route>
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User
                {...props}
                getSingleUser={this.getSingleUser}
                getUserRepos={this.getUserRepos}
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
}

export default App;
