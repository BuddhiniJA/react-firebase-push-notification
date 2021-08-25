import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { getToken, onMessageListener } from './firebase';
import {  Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });
  const [isTokenFound, setTokenFound] = useState(false);
  getToken(setTokenFound);

  onMessageListener().then(payload => {
    setShow(true);
    setNotification({ title: payload.notification.title, body: payload.notification.body })
    console.log(payload);
  }).catch(err => console.log('failed: ', err));

  
  return (
    <div className="App">
      <Toast 
        onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
        position: 'absolute',
        top: 20,
        right: 20,
        minWidth: 200,
        
      }}>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded mr-2"
            
          />
          <strong className="mr-auto">{notification.title}</strong>
          
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          My First Push Notification Service
        </p>

      </header>
    </div>
  );
}

export default App;
