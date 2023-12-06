import React, { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import { toast } from 'react-toastify';
import { formStyle, inputStyle, labelStyle, buttonStyle, disabledButtonStyle, athleteContainerStyle } from '../styles/signup';
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
  streetAddress: string;
  city: string;
  zipcode: string;
  carrier: string;
  policyNumber: string;
  emergencyName: string;
  emergencyPhone: string;
  athletes: AthleteSignupForm[];
}

const SignupForm: React.FC = () => {
  const [parentFormData, setParentFormData] = useState<ParentForm>({
    parentName: '',
    email: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    zipcode: '',
    carrier: '',
    policyNumber: '',
    emergencyName: '',
    emergencyPhone: '',
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
  
    const { post, data, error, loading } = useApi<any>('/signup');
    const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Parent Form Data:', parentFormData);
    e.preventDefault();
    setIsSubmitting(true); // Disable the button and start submission process

    // Prepare the data to be sent
    const requestData = {
      ...parentFormData,
      athletes: parentFormData.athletes,
    };

    // Use the post method from useApi to send the data
    try {
      const response = await post(requestData);
      // Handle the successful submission here
      console.log(response);
      
    // Handle the successful submission here
    toast.success('Sign up successful! Refreshing page...', {
      position: "top-center",
      autoClose: 5000,  // Toast will disappear after 5 seconds
      onClose: () => {
        // Refresh the page 1 second after the toast disappears
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      },
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    } catch (err) {
      // Handle errors here
      console.error('Error:', err);
    }
    

  };
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
  };

  const handleContractClick = () => {
    const contractPath = process.env.PUBLIC_URL + '/assets/PLAYER_CONTRACT.pdf';
    window.open(contractPath, 'Contract', 'height=600,width=800');
  };

  const [isFormValid, setIsFormValid] = useState(false);

  // Regular expressions for validation
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

  // Validation function
  const validateForm = () => {
    // Validate email and phone number formats
    const isEmailValid = emailRegex.test(parentFormData.email);
    const isPhoneValid = phoneRegex.test(parentFormData.phoneNumber);

    // Check other parent data
    const isParentDataValid = parentFormData.parentName && parentFormData.email && 
                              parentFormData.phoneNumber && parentFormData.streetAddress && 
                              parentFormData.city && parentFormData.zipcode && 
                              parentFormData.carrier && parentFormData.policyNumber && 
                              parentFormData.emergencyName && parentFormData.emergencyPhone;

    // Check each athlete data
    const areAthletesValid = parentFormData.athletes.every(athlete => 
      athlete.athleteFullName && athlete.dateOfBirth && athlete.gender && athlete.returner_status
    );

    setIsFormValid(!!(isEmailValid && isPhoneValid && isParentDataValid && areAthletesValid && isAgreed));
  };

  useEffect(() => {
    validateForm();
  }, [parentFormData, isAgreed]);
  // Effect to re-validate form when data changes
  useEffect(() => {
    validateForm();
  }, [parentFormData, isAgreed]);

const currentButtonStyle = isAgreed ? buttonStyle : disabledButtonStyle;


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
            name="email"
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
            name="phoneNumber"
            value={parentFormData.phoneNumber}
            onChange={handleParentChange}
            style={inputStyle}
          />
        </label>
      </div>
      <div style={labelStyle}>
        <label>
          Street Address:
          <input
            type="text"
            name="streetAddress"
            value={parentFormData.streetAddress}
            onChange={handleParentChange}
            style={inputStyle}
          />
        </label>
      </div>
      <div style={labelStyle}>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={parentFormData.city}
            onChange={handleParentChange}
            style={inputStyle}
          />
        </label>
      </div>
      <div style={labelStyle}>
        <label>
          Zip code:
          <input
            type="text"
            name="zipcode"
            value={parentFormData.zipcode}
            onChange={handleParentChange}
            style={inputStyle}
          />
        </label>
      </div>
      <div style={labelStyle}>
        <label>
          Insurance Carrier:
          <input
            type="text"
            name="carrier"
            value={parentFormData.carrier}
            onChange={handleParentChange}
            style={inputStyle}
          />
        </label>
      </div>
      <div style={labelStyle}>
        <label>
          Insurance Policy #:
          <input
            type="text"
            name="policyNumber"
            value={parentFormData.policyNumber}
            onChange={handleParentChange}
            style={inputStyle}
          />
        </label>
      </div>
      <div style={labelStyle}>
        <label>
          Emergency Contact:
          <input
            type="text"
            name="emergencyName"
            value={parentFormData.emergencyName}
            onChange={handleParentChange}
            style={inputStyle}
          />
        </label>
      </div>   
      <div style={labelStyle}>
        <label>
          Emergency Contact Phone Number:
          <input
            type="text"
            name="emergencyPhone"
            value={parentFormData.emergencyPhone}
            onChange={handleParentChange}
            style={inputStyle}
          />
        </label>
      </div>   
      {/* Repeat similar divs for other parent fields like email and phone number */}
      {parentFormData.athletes.map((athlete, index) => (
        <div key={index} style={athleteContainerStyle} className='athlete-container'>
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
      <div style={labelStyle}>
        <label>
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={handleAgreementChange}
            style={{ marginRight: '10px' }}
          />
          I agree to the <a href="#!" onClick={handleContractClick}>contract</a>
        </label>
      </div>
      <button type="submit" style={currentButtonStyle} disabled={!isFormValid || isSubmitting}>
        {isAgreed ? 'Sign Up' : '⚠️ Agree to Contract'}
      </button>
    </form>
  );
};

export default SignupForm;
