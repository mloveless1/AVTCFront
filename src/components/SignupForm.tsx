import React, { useState } from 'react';
import logo from '../assets/logo.jpg'
interface AthleteSignupForm {
  athleteFullName: string;
  dateOfBirth: string;
  parentName: string;
  email: string;
  phoneNumber: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<AthleteSignupForm>({
    athleteFullName: '',
    dateOfBirth: '',
    parentName: '',
    email: '',
    phoneNumber: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  // Typed inline styles
  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    padding: '20px',
    maxWidth: '500px',
    backgroundColor: '#000', // Black background from the logo
    color: '#FFD700', // Yellow text, similar to the logo
    borderRadius: '8px', // Optional: to give the form rounded corners
  };

  const inputStyle: React.CSSProperties = {
    margin: '10px 0',
    padding: '10px',
    width: '100%',
    backgroundColor: 'white', // White input backgrounds for contrast
    border: '2px solid #FFD700', // Yellow border from the logo
    color: 'black', // Black text for readability on white background
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    color: '#FFD700', // Yellow label text
  };

  const buttonStyle: React.CSSProperties = {
    ...inputStyle,
    backgroundColor: '#FFD700', // Yellow button background
    color: 'black', // Black button text
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={labelStyle}>
        <label>
          Athlete's Full Name:
          <input
            type="text"
            name="athleteFullName"
            value={formData.athleteFullName}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
      </div>
      <div style={labelStyle}>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
      </div>
      <div style={labelStyle}>
        <label>
          Parent's Name:
          <input
            type="text"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
      </div>
      <div style={labelStyle}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
      </div>
      <div style={labelStyle}>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
      </div>
      <button type="submit" style={buttonStyle}>Sign Up</button>
    </form>
  );
};

export default SignupForm;
