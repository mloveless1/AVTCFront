import React, { useEffect, useState, useRef, useCallback, MutableRefObject } from 'react';
import useApi from '../hooks/useApi';
import { toast } from 'react-toastify';
import SignatureCanvas from 'react-signature-canvas';
import CollapsibleSection from './CollapsibleSection';
import ParentInfoForm from './ParentInfoForm';
import AthleteInfoForm from './AthleteInfoForm';
import AgreementSection from './AgreementSection';
import SubmitButton from './SubmitButton';
import { formStyle } from '../styles/signup';
import { blackGoldToastStyle } from '../styles/toast';

const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length;
const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : phoneNumber;
};

interface AthleteSignupForm {
  athleteFirstName: string;
  athleteLastName: string;
  suffixName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  returner_status: 'new' | 'returner';
  lastPhysical: string;
  medicalConditions: string;
}

interface ParentForm {
  parentFirstName: string;
  parentLastName: string;
  suffixName: string;
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
    parentFirstName: '',
    parentLastName: '',
    suffixName: '',
    email: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    zipcode: '',
    carrier: '',
    policyNumber: '',
    emergencyName: '',
    emergencyPhone: '',
    athletes: [{ athleteFirstName: '', athleteLastName: '', suffixName: '', dateOfBirth: '', gender: 'male', returner_status: 'new', lastPhysical: '', medicalConditions: '' }],
  });

  const [isAthleteRemovable, setAthleteIsRemovable] = useState(false);
  const [invalidFields, setInvalidFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const parentSignaturePadRef = useRef<SignatureCanvas>(null);
  const athleteSignaturePadRefs = useRef<(SignatureCanvas | null)[]>([]);

  const { post, data, error } = useApi<any>('/signup');

  const handleContractClick = () => window.open(`${process.env.PUBLIC_URL}/assets/PLAYER_CONTRACT.pdf`, 'Contract', 'height=600,width=800');
  const handleConductClick = () => window.open(`${process.env.PUBLIC_URL}/assets/CODE_OF_CONDUCT.pdf`, 'Conduct', 'height=600,width=800');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const updatedAthletes = parentFormData.athletes.map((athlete, i) =>
        i === index ? { ...athlete, [name]: value } : athlete
      );
      setParentFormData({ ...parentFormData, athletes: updatedAthletes });
    } else {
      setParentFormData({ ...parentFormData, [name]: value });
    }
  };

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (['phoneNumber', 'emergencyPhone'].includes(name)) {
      setParentFormData({ ...parentFormData, [name]: formatPhoneNumber(value) });
    }
  };

  const handleAddAthlete = () => {
    const newAthlete: AthleteSignupForm = { athleteFirstName: '', athleteLastName: '', suffixName: '', dateOfBirth: '', gender: 'male', returner_status: 'new', lastPhysical: '', medicalConditions: '' };
    setParentFormData(prev => ({ ...prev, athletes: [...prev.athletes, newAthlete] }));
    athleteSignaturePadRefs.current.push(null!);
  };

  const handleRemoveAthlete = (index: number) => {
    setParentFormData(prev => ({ ...prev, athletes: prev.athletes.filter((_, i) => i !== index) }));
    athleteSignaturePadRefs.current.splice(index, 1);
  };

  const validateForm = useCallback(() => {
    const isParentDataValid = Object.values(parentFormData).every(val => !isEmpty(val));
    const areAthletesValid = parentFormData.athletes.every(athlete => Object.values(athlete).every(val => !isEmpty(val)));
    setIsFormValid(isParentDataValid && areAthletesValid && isAgreed);
  }, [parentFormData, isAgreed]);

  useEffect(() => setAthleteIsRemovable(parentFormData.athletes.length > 1), [parentFormData.athletes]);
  useEffect(() => validateForm(), [validateForm]);

  useEffect(() => {
    if (data && !error) {
      toast.success('Sign up successful! Refreshing page...', {
        style: blackGoldToastStyle, autoClose: 3000, onClose: () => window.location.reload(),
      });
    }
    if (error) toast.error('An error occurred during signup.', { style: blackGoldToastStyle });
  }, [data, error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const parentSignature = parentSignaturePadRef.current?.getTrimmedCanvas().toDataURL();
    const athleteSignatures = athleteSignaturePadRefs.current.map(ref => ref?.getTrimmedCanvas().toDataURL());

    const requestData = {
      ...parentFormData,
      athletes: parentFormData.athletes.map((athlete, index) => ({
        ...athlete, signature: athleteSignatures[index]
      })),
      parentSignature,
    };

    await post(requestData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <CollapsibleSection title="Parent Info"
         content={<ParentInfoForm data={parentFormData} 
         onChange={handleInputChange} 
         onBlur={handlePhoneBlur} 
         invalidFields={invalidFields} />} />
      <CollapsibleSection 
        title="Athlete Info" 
        content={
          <AthleteInfoForm 
            athletes={parentFormData.athletes} 
            signaturePadRefs={athleteSignaturePadRefs} 
            isRemovable={isAthleteRemovable} 
            onAdd={handleAddAthlete} 
            onRemove={handleRemoveAthlete} 
            onChange={handleInputChange} />
          } />
      <CollapsibleSection 
        title="Agreement"
        content={
          <AgreementSection 
            isAgreed={isAgreed} 
            onAgreementChange={setIsAgreed} 
            parentSignaturePadRef={parentSignaturePadRef} 
            handleContractClick={handleContractClick} 
            handleConductClick={handleConductClick} />
        } />
      <SubmitButton isSubmitting={isSubmitting} isFormValid={isFormValid} />
    </form>
  );
};

export default SignupForm;
