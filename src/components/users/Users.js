import React, { Component } from 'react'
import UserItem from './UserItem'

class Users extends Component {
  state = {
    users: [
      { id: '1',
      login: 'Thiago Pizzutti',
      avatar_url: "https://avatars2.githubusercontent.com/u/8037076?v=4",
        html_url: "https://github.com/thiagopizzutti"
      },
      
      {
        id: '2',
      login: 'Claudio Costa',
      avatar_url: "https://avatars2.githubusercontent.com/u/8037076?v=4",
        html_url: "https://github.com/thiagopizzutti"
      },
      
      {
        id: '3',
      login: 'Henrique Meireles',
      avatar_url: "https://avatars2.githubusercontent.com/u/8037076?v=4",
      html_url: "https://github.com/thiagopizzutti"}
    ]
  }
  
  render() {
    return (
      <div style={userStyle}>
        {this.state.users.map(user => (
          <UserItem key={user.id} user={user}/>
        ))}
      </div>
    )
  }
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'

}

export default Users
