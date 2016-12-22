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

class FileUpload extends React.Component {
  constructor () {
    super()
    this.state = {
      uploadValue: 0
    }
    this.handleOnChange = this.handleOnChange.bind(this)
  }
  handleOnChange (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`pictures/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        uploadValue: percentage
      })
    }, (error) => {
      this.setState({
        message: `Ha ocurrido un error: ${error.message}`
      })
    }, () => {
      this.setState({
        message: `Archivo subido exitosamente`,
        picture: task.snapshot.downloadURL
      })
    })
  }
  render () {
    return (
      <div>
        <progress value={this.state.uploadValue} max='100' />
        <br />
        <input type='file' onChange={this.handleOnChange} />
        <br />
        {this.state.message}
        <img src={this.state.picture} width='100' />
      </div>
    )
  }
}

ReactDom.render(<FileUpload />, document.getElementById('root'))
