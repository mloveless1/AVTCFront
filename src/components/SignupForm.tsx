import React, { useState } from 'react';

interface AthleteSignupForm {
  athleteFullName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  returner_status: 'new' | 'returner';
}

interface ParentForm {
  parentName: string;
  email: string;
  phoneNumber: string;
  athletes: AthleteSignupForm[];
}

const SignupForm: React.FC = () => {
  const [parentFormData, setParentFormData] = useState<ParentForm>({
    parentName: '',
    email: '',
    phoneNumber: '',
    athletes: [
      {
        athleteFullName: '',
        dateOfBirth: '',
        gender: 'male',
        returner_status: 'new',
      },
    ],
  });

  const handleAthleteChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const updatedAthletes = parentFormData.athletes.map((athlete, i) =>
      i === index ? { ...athlete, [e.target.name]: e.target.value } : athlete
    );
    setParentFormData({ ...parentFormData, athletes: updatedAthletes });
  };

  const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParentFormData({
      ...parentFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAthlete = () => {
    setParentFormData({
      ...parentFormData,
      athletes: [
        ...parentFormData.athletes,
        {
          athleteFullName: '',
          dateOfBirth: '',
          gender: 'male',
          returner_status: 'new',
        },
      ],
    });
  };

    // Function to remove an athlete's input fields
    const handleRemoveAthlete = (index: number) => {
      const updatedAthletes = parentFormData.athletes.filter((_, i) => i !== index);
      setParentFormData({ ...parentFormData, athletes: updatedAthletes });
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Parent Form Data:', parentFormData);
    // Submit parentFormData to your backend or state management
  };

  // Inline styles
  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    padding: '20px',
    maxWidth: '500px',
    backgroundColor: '#000',
    color: '#FFD700',
    borderRadius: '8px',
  };

  const inputStyle: React.CSSProperties = {
    margin: '10px 0',
    padding: '10px',
    width: 'calc(100% - 20px)',
    backgroundColor: 'white',
    border: '2px solid #FFD700',
    color: 'black',
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    color: '#FFD700',
  };

  const buttonStyle: React.CSSProperties = {
    ...inputStyle,
    backgroundColor: '#FFD700',
    color: 'black',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={labelStyle}>
        <label>
          Parent's Name:
          <input
            type="text"
            name="parentName"
            value={parentFormData.parentName}
            onChange={handleParentChange}
            style={inputStyle}
          />
        </label>
      </div>
      <div style={labelStyle}>
        <label>
          Parent's Email:
          <input
            type="text"
            name="parentEmail"
            value={parentFormData.email}
            onChange={handleParentChange}
            style={inputStyle}
          />
        </label>
      </div> 
      <div style={labelStyle}>
        <label>
          Parent's Phone Number:
          <input
            type="text"
            name="parentPhone"
            value={parentFormData.phoneNumber}
            onChange={handleParentChange}
            style={inputStyle}
          />
        </label>
      </div>      
      {/* Repeat similar divs for other parent fields like email and phone number */}
      {parentFormData.athletes.map((athlete, index) => (
        <div key={index}>
          {/* Athlete's Full Name */}
          <div style={labelStyle}>
            <label>
              Athlete's Full Name:
              <input
                type="text"
                name="athleteFullName"
                value={athlete.athleteFullName}
                onChange={(e) => handleAthleteChange(index, e)}
                style={inputStyle}
              />
            </label>
          </div>
          {/* Date of Birth */}
          <div style={labelStyle}>
            <label>
              Date of Birth:
              <input
                type="date"
                name="dateOfBirth"
                value={athlete.dateOfBirth}
                onChange={(e) => handleAthleteChange(index, e)}
                style={inputStyle}
              />
            </label>
          </div>
          {/* Gender */}
          <div style={labelStyle}>
            <label>
              Gender:
              <select
                name="gender"
                value={athlete.gender}
                onChange={(e) => handleAthleteChange(index, e)}
                style={inputStyle}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div>
          {/* Returner Status */}
          <div style={labelStyle}>
            <label>
              Returner Status:
              <select
                name="returner_status"
                value={athlete.returner_status}
                onChange={(e) => handleAthleteChange(index, e)}
                style={inputStyle}
              >
                <option value="new">New</option>
                <option value="returner">Returner</option>
              </select>
            </label>
            <button
            type="button"
            onClick={() => handleRemoveAthlete(index)}
            style={{ ...buttonStyle }}>
            Remove
          </button>
          </div>
        </div>
      ))}
      <button type="button" onClick={handleAddAthlete} style={buttonStyle}>
        Add Another Athlete
      </button>
      <button type="submit" style={buttonStyle}>Sign Up</button>
    </form>
  );
};

export default SignupForm;
