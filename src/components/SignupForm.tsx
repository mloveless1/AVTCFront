import React, { useState } from 'react';

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
    // Handle form submission logic here
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Athlete's Full Name:
        <input
          type="text"
          name="athleteFullName"
          value={formData.athleteFullName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Date of Birth:
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Parent's Name:
        <input
          type="text"
          name="parentName"
          value={formData.parentName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
