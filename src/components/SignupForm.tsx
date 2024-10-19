import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import SignatureCanvas from 'react-signature-canvas';
import CollapsibleSection from './CollapsibleSection';
import ParentInfoForm from './ParentInfoForm';
import AthleteInfoForm from './AthleteInfoForm';
import AgreementSection from './AgreementSection';
import SubmitButton from './SubmitButton';
import { formStyle } from '../styles/signup';
import { blackGoldToastStyle } from '../styles/toast';
import { useAgreementContext } from './context/AgreementContext';
import useApi from '../hooks/useApi';

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
    athletes: [
      {
        athleteFirstName: '',
        athleteLastName: '',
        suffixName: '',
        dateOfBirth: '',
        gender: 'male',
        returner_status: 'new',
        lastPhysical: '',
        medicalConditions: '',
      },
    ],
  });

  const [isRemovable, setIsRemovable] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAgreed } = useAgreementContext();
  const parentSignaturePadRef = useRef<SignatureCanvas>(null);
  const athleteSignaturePadRefs = useRef<(SignatureCanvas | null)[]>([]);
  const { post, data, error } = useApi<any>('/signup');

  const handleContractClick = () =>
    window.open(
      `${process.env.PUBLIC_URL}/assets/PLAYER_CONTRACT.pdf`,
      'Contract',
      'height=600,width=800'
    );

  const handleConductClick = () =>
    window.open(
      `${process.env.PUBLIC_URL}/assets/conduct.pdf`,
      'Conduct',
      'height=600,width=800'
    );


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number
  ) => {
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
      const formatted = value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      setParentFormData({ ...parentFormData, [name]: formatted });
    }
  };

  const handleAddAthlete = () => {
    const newAthlete: AthleteSignupForm = {
      athleteFirstName: '',
      athleteLastName: '',
      suffixName: '',
      dateOfBirth: '',
      gender: 'male',
      returner_status: 'new',
      lastPhysical: '',
      medicalConditions: '',
    };
    setParentFormData((prev) => ({
      ...prev,
      athletes: [...prev.athletes, newAthlete],
    }));
    athleteSignaturePadRefs.current.push(null!);
  };

  const handleRemoveAthlete = (index: number) => {
    setParentFormData((prev) => ({
      ...prev,
      athletes: prev.athletes.filter((_, i) => i !== index),
    }));
    athleteSignaturePadRefs.current.splice(index, 1);
  };

  const validateAthleteAges = (): boolean => {
    const seasonYear = 2025;
    const tooYoung = parentFormData.athletes.some((athlete) => {
      const birthDate = new Date(athlete.dateOfBirth);
      const ageInSeason = seasonYear - birthDate.getFullYear();
      return ageInSeason < 5;
    });

    if (tooYoung) {
      toast.error('One or more athletes are too young for signup.', { style: blackGoldToastStyle });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateAthleteAges()) return;

    setIsSubmitting(true);
    const parentSignature = parentSignaturePadRef.current?.getTrimmedCanvas().toDataURL();
    const athleteSignatures = athleteSignaturePadRefs.current.map(
      (ref) => ref?.getTrimmedCanvas().toDataURL()
    );

    const requestData = {
      ...parentFormData,
      parent_signature: parentSignature,
      athletes: parentFormData.athletes.map((athlete, index) => ({
        ...athlete,
        athlete_signature: athleteSignatures[index],
      })),
    };

    await post(requestData);
    setIsSubmitting(false);
  };

  useEffect(() => {
    setIsRemovable(parentFormData.athletes.length > 1)
  }, [parentFormData.athletes]);

  useEffect(() => {
    if (data && !error) {
      toast.success('Sign up successful! Refreshing page...', {
        style: blackGoldToastStyle,
        autoClose: 3000,
        onClose: () => window.location.reload(),
      });
    }
    if (error) {
      toast.error('An error occurred during signup.', { style: blackGoldToastStyle });
    }
  }, [data, error]);

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <CollapsibleSection
        title="Parent Info"
        content={
          <ParentInfoForm
            data={parentFormData}
            onChange={handleInputChange}
            onBlur={handlePhoneBlur} 
            invalidFields={{}}/>
        }
      />
      <CollapsibleSection
        title="Athlete Info"
        content={
          <AthleteInfoForm
            athletes={parentFormData.athletes}
            onAdd={handleAddAthlete}
            onRemove={handleRemoveAthlete}
            onChange={handleInputChange} 
            isRemovable={isRemovable} 
            signaturePadRefs={athleteSignaturePadRefs}          />
        }
      />
      <CollapsibleSection
        title="Agreement"
        content={
          <AgreementSection
            parentSignaturePadRef={parentSignaturePadRef} 
            handleConductClick={handleConductClick}
            handleContractClick={handleContractClick}
            />
        }
      />
      <SubmitButton isSubmitting={isSubmitting} isFormValid={true} />
    </form>
  );
};

export default SignupForm;
