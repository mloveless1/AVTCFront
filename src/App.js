import React from 'react';
import logo from './assets/logo.jpg';
import './App.css';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} alt="A.V. Track Club Logo"/>
        <p>
          Welcome to the A.V. Youth Track Club Sign Up
        </p>
        <SignupForm />
      </header>
    </div>
  );
}

export default App;
