import React, { useEffect, useState, useRef, useCallback } from 'react';
import useApi from '../hooks/useApi';
import { toast } from 'react-toastify';
import SignatureCanvas from 'react-signature-canvas';
import SignaturePadComponent from './SignaturePadComponent';
import Collapsible from 'react-collapsible';
import { BsChevronDown } from 'react-icons/bs';
import { FaSpinner } from 'react-icons/fa';
import { formStyle, inputStyle, invalidInputStyle, athleteContainerStyle } from '../styles/signup';
import { adjustedCollapsibleStyle, labelStyle, buttonStyle, disabledButtonStyle } from '../styles/signup';
import { blackGoldToastStyle } from '../styles/toast';



const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length;


interface AthleteSignupForm {
  athleteFullName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  returner_status: 'new' | 'returner';
  lastPhysical: string;
  medicalConditions: string;
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
        lastPhysical: '',
        medicalConditions: '',
      },
    ],
  });
  // Refs for signature pads
  const parentSignaturePadRef = useRef<SignatureCanvas>(null);
  // const athleteSignaturePadRefs = useRef([React.createRef<SignatureCanvas>()]);

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
    const newAthlete: AthleteSignupForm = {
      athleteFullName: '',
      dateOfBirth: '',
      gender: 'male',
      returner_status: 'new',
      lastPhysical: '',
      medicalConditions: '',
    };
  
    setParentFormData((prevState) => ({
      ...prevState,
      athletes: [...prevState.athletes, newAthlete],
    }));
  
    // Initialize a new ref for the new athlete and add it to the refs array
   // athleteSignaturePadRefs.current = [...athleteSignaturePadRefs.current, React.createRef()];
  };
  
const handleRemoveAthlete = (index: number) => {
  const updatedAthletes = parentFormData.athletes.filter((_, i) => i !== index);
  // const updatedRefs = athleteSignaturePadRefs.current.filter((_, i) => i !== index);
  
  setParentFormData({ ...parentFormData, athletes: updatedAthletes });
  // athleteSignaturePadRefs.current = updatedRefs;
};

    const [invalidFields, setInvalidFields] = useState({
      parentName: false,
      email: false,
      phoneNumber: false,
      streetAddress: false,
      city: false,
      zipcode: false,
      carrier: false,
      emergencyName: false,
      emergencyPhone: false,
    }); 
    const { post, data, error } = useApi<any>('/signup');
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Effect for handling success
    useEffect(() => {
      if (data && !error) { // If there's data and no error, it's a success
        toast.success('Sign up successful! Refreshing page...', {
          position: "top-center",
          autoClose: 5000,  // Toast will disappear after 5 seconds
         /* onClose: () => {
            // Refresh the page 1 second after the toast disappears
            setTimeout(() => {
              setIsSubmitting(false);
              window.location.reload();
            }, 5000);
          },*/ 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: blackGoldToastStyle,
          });
      // Perform any other actions on success, e.g., redirecting the user
      setIsSubmitting(false);
    
      // window.location.reload(); or use your preferred way of navigating
    }
}, [data, error]);
    useEffect(() => {
      if (error) {
        if (error.response && error.response.status === 409) {
          toast.error('Sign up failed, parent with that email has already signed up. Try a different email.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: blackGoldToastStyle,
          });
        } else {
          // Handle other errors or general error message
          toast.error('An unexpected error occurred. Please try again later.', {
            // Toast configuration
          });
        }
        setIsSubmitting(false);
      }
    }, [error]);
    
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //console.log('Parent Form Data:', parentFormData);
    e.preventDefault();
    setIsSubmitting(true); 
    // console.log('Athlete Signature Pad Refs:', athleteSignaturePadRefs.current);

    // Signature images
    const parentSignatureImage = parentSignaturePadRef.current?.getTrimmedCanvas().toDataURL('image/png');
 /*   const athleteSignatureImages = parentFormData.athletes.map((_, index) => {
      const ref = athleteSignaturePadRefs.current[index];
      return ref && ref.current ? ref.current.getTrimmedCanvas().toDataURL('image/png') : null;
    }); */
    
    


    // Prepare the data to be sent
    const requestData = {
      ...parentFormData,
      athletes: parentFormData.athletes.map((athlete, index) => ({
        ...athlete,
      })),
      signature: parentSignatureImage,
    };

    if (!isFormValid){

      // Update invalid fields state
      setInvalidFields({
        parentName: isEmpty(parentFormData.parentName),
        email: !isEmailValid,
        phoneNumber: !isPhoneValid,
        streetAddress: isEmpty(parentFormData.streetAddress),
        city: isEmpty(parentFormData.city ),
        zipcode: isEmpty(parentFormData.zipcode),
        carrier: isEmpty(parentFormData.carrier),
        emergencyName: isEmpty(parentFormData.emergencyName),
        emergencyPhone: isEmpty(parentFormData.emergencyPhone),
      // Set other fields accordingly
      });
          // Scroll to top of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      toast.error('Sign up failed, please check fields. Fill required fields.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: blackGoldToastStyle,
      });

      setIsSubmitting(false);
      return;
    } else {
      await post(requestData);
      setIsSubmitting(false);
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
  
  const handleConductClick = () => {
    const conductPath = process.env.PUBLIC_URL + '/assets/conduct.pdf';
    window.open(conductPath, 'Conduct', 'height=600,width=800');
  };

  const handleSignatureClear = () => {
    console.log('Signature cleared!');
  };
  const [isFormValid, setIsFormValid] = useState(false);

  // Regular expressions for validation
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
 // Validate email and phone number formats
 const isEmailValid = emailRegex.test(parentFormData.email);
 const isPhoneValid = phoneRegex.test(parentFormData.phoneNumber);
 const isEmergencyPhoneValid = phoneRegex.test(parentFormData.emergencyPhone);

  // Validation function
  const validateForm = useCallback(() => {
    // Check other parent data
    const isParentDataValid = parentFormData.parentName && parentFormData.email && 
                              parentFormData.phoneNumber && parentFormData.streetAddress && 
                              parentFormData.city && parentFormData.zipcode && 
                              parentFormData.carrier && 
                              parentFormData.emergencyName && parentFormData.emergencyPhone;

    // Check each athlete data
    const areAthletesValid = parentFormData.athletes.every(athlete => 
      athlete.athleteFullName && athlete.dateOfBirth && athlete.gender && athlete.returner_status
    );

    setIsFormValid(!!( isEmergencyPhoneValid && isEmailValid && isPhoneValid && isParentDataValid && areAthletesValid && isAgreed));
  }, [parentFormData, isAgreed, isEmailValid, isEmergencyPhoneValid, isPhoneValid]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);


const currentButtonStyle = isAgreed ? buttonStyle : disabledButtonStyle;


  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <Collapsible trigger={<div style={adjustedCollapsibleStyle}>Section 1: Parent Information <BsChevronDown /></div>}>
      <div style={labelStyle}>
        <label>
          Parent's Name *:
          <input
            type="text"
            name="parentName"
            placeholder='Enter your first and last name'
            value={parentFormData.parentName}
            onChange={handleParentChange}
            style={ invalidFields.parentName ? invalidInputStyle : inputStyle }
          />
        </label>
      </div>
      <div style={labelStyle}>
        <label>
          Parent's Email *:
          <input
            type="text"
            name="email"
            placeholder='Enter your email'
            value={parentFormData.email}
            onChange={handleParentChange}
            style={ invalidFields.email ? invalidInputStyle : inputStyle }
          />
        </label>
      </div> 
      <div style={labelStyle}>
        <label>
          Parent's Phone Number *:
          <input
            type="text"
            name="phoneNumber"
            placeholder='Must be in the format: ###-###-####'
            value={parentFormData.phoneNumber}
            onChange={handleParentChange}
            style={ invalidFields.phoneNumber ? invalidInputStyle : inputStyle }
          />
        </label>
      </div>
      <div style={labelStyle}>
        <label>
          Street Address *:
          <input
            type="text"
            name="streetAddress"
            placeholder='Enter your address'
            value={parentFormData.streetAddress}
            onChange={handleParentChange}
            style={ invalidFields.streetAddress ? invalidInputStyle : inputStyle }
          />
        </label>
      </div>
      <div style={labelStyle}>
        <label>
          City *:
          <input
            type="text"
            name="city"
            placeholder='Enter your city'
            value={parentFormData.city}
            onChange={handleParentChange}
            style={ invalidFields.city ? invalidInputStyle : inputStyle }
          />
        </label>
      </div>
      <div style={labelStyle}>
        <label>
          Zip code *:
          <input
            type="text"
            name="zipcode"
            placeholder='Enter your zip code'
            value={parentFormData.zipcode}
            onChange={handleParentChange}
            style={ invalidFields.zipcode ? invalidInputStyle : inputStyle }
          />
        </label>
      </div>
      <div style={labelStyle}>
        <label>
          Insurance Carrier *:
          <input
            type="text"
            name="carrier"
            placeholder='Enter your insurance carrier'
            value={parentFormData.carrier}
            onChange={handleParentChange}
            style={ invalidFields.carrier ? invalidInputStyle : inputStyle }
          />
        </label>
      </div>
      <div style={labelStyle}>
        <label>
          Insurance Policy #:
          <input
            type="text"
            name="policyNumber"
            placeholder='Enter your policy number'
            value={parentFormData.policyNumber}
            onChange={handleParentChange}
            style={ inputStyle }
          />
        </label>
      </div>
      <div style={labelStyle}>
        <label>
          Emergency Contact *:
          <input
            type="text"
            name="emergencyName"
            placeholder='Enter emergency contact'
            value={parentFormData.emergencyName}
            onChange={handleParentChange}
            style={ invalidFields.emergencyName ? invalidInputStyle : inputStyle }
          />
        </label>
      </div>   
      <div style={labelStyle}>
        <label>
          Emergency Contact Phone Number *:
          <input
            type="text"
            name="emergencyPhone"
            placeholder='Must be in the format: ###-###-####'
            value={parentFormData.emergencyPhone}
            onChange={handleParentChange}
            style={ invalidFields.emergencyPhone ? invalidInputStyle : inputStyle }
          />
        </label>
      </div>  
      </Collapsible> 
      {/* Repeat similar divs for other parent fields like email and phone number */}
      <Collapsible trigger={<div style={adjustedCollapsibleStyle}>Section 2: Athlete Information <BsChevronDown /></div>}>
      {parentFormData.athletes.map((athlete, index) => (
        <div key={index} style={athleteContainerStyle} className='athlete-container'>
          {/* Athlete's Full Name */}
          <div style={labelStyle}>
            <label>
              Athlete's Full Name *:
              <input
                type="text"
                name="athleteFullName"
                placeholder='Enter your childs name'
                value={athlete.athleteFullName}
                onChange={(e) => handleAthleteChange(index, e)}
                style={inputStyle}
              />
            </label>
          </div>
          {/* Date of Birth */}
          <div style={labelStyle}>
            <label>
              Date of Birth *:
              <input
                type="date"
                name="dateOfBirth"
                value={athlete.dateOfBirth}
                onChange={(e) => handleAthleteChange(index, e)}
                style={inputStyle}
              />
            </label>
          </div>
          {/* Any medical concernss */}
          <div style={labelStyle}>
            <label>
              Medical or physical conditions (s) that are of concern to me:
              <input
                type="text"
                name="medicalConditions"
                placeholder='Medical'
                value={athlete.medicalConditions}
                onChange={(e) => handleAthleteChange(index, e)}
                style={inputStyle}
              />
            </label>
          </div>
          {/* Last Physical */}
          <div style={labelStyle}>
            <label>
              Last Physical *:
              <input
                type="date"
                name="lastPhysical"
                value={athlete.lastPhysical}
                onChange={(e) => handleAthleteChange(index, e)}
                style={inputStyle}
              />
            </label>
          </div>          
          {/* Gender */}
          <div style={labelStyle}>
            <label>
              Gender *:
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
              Returner Status *:
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
          <div style={labelStyle}>
            <label>
              {/* Athlete Signature *:
              <SignaturePadComponent ref={athleteSignaturePadRefs.current[index]} onClear={handleSignatureClear} />*/}
            </label>
          </div>
        </div>
      ))}
      <button type="button" onClick={handleAddAthlete} style={buttonStyle}>
        Add Another Athlete
      </button>
      </Collapsible>
      <Collapsible trigger={<div style={adjustedCollapsibleStyle}>Section 3: Agreement <BsChevronDown /></div>}>
      <div style={labelStyle}>
        <label>
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={handleAgreementChange}
            style={{ marginRight: '10px' }}
          />
          I agree to the <a href="#!" onClick={handleContractClick}>Contract</a> & <a href="#!" onClick={handleConductClick}>Code Of Conduct</a>
        </label>
      </div>
      <p>
        Parent Signature *:
      </p>
      <SignaturePadComponent ref={parentSignaturePadRef} onClear={handleSignatureClear} />
      

      <button type="submit" style={currentButtonStyle} disabled={ !isAgreed || isSubmitting }>
      {isSubmitting ? (
      <>
        <FaSpinner className="spinner" /> {/* Replace with your spinner */}
        Loading...
      </>
    ) : (
      isAgreed ? 'Sign Up' : '⚠️ Agree to Contract'
    )}
      </button>

      </Collapsible>
    </form>
  );
};

export default SignupForm;
