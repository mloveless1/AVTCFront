import logo from '../assets/logo.jpg'
import { ToastContainer } from "react-toastify";
import SignupForm from '../components/SignupForm';

function Signup() {
    return (
      <div className="App">
        <header className="App-header">
        <ToastContainer />
        <img src={logo} alt="A.V. Track Club Logo"/>
          <p>
            A.V. Youth Track Club Sign Up Form
          </p>
          <SignupForm />
        </header>
      </div>
    );
  }

  export default Signup;