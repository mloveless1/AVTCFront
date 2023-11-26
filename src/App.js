import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* You can include the logo and other elements here as needed */}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the Youth Track Club Sign Up
        </p>
        <SignupForm />
      </header>
    </div>
  );
}

export default App;
