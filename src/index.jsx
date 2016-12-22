import React from 'react'
import ReactDom from 'react-dom'
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDmv1njxEw5uZElVaYjdsO8J-XP3rwPIpc',
  authDomain: 'testing-firebase-react.firebaseapp.com',
  databaseURL: 'https://testing-firebase-react.firebaseio.com',
  storageBucket: 'testing-firebase-react.appspot.com',
  messagingSenderId: '604387225650'
}
firebase.initializeApp(config)

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      name: 'Kras'
    }
  }

  componentWillMount () {
    const nameRef = firebase.database().ref().child('object').child('name')
    nameRef.on('value', snapshot => {
      this.setState({
        name: snapshot.val()
      })
    })
  }

  render () {
    return <h1>Hola {this.state.name}!</h1>
  }
}

ReactDom.render(<App />, document.getElementById('root'))
