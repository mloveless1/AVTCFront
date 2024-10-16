import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { buttonStyle, disabledButtonStyle } from '../styles/signup';
import { useAgreementContext } from './context/AgreementContext';

interface SubmitButtonProps {
  isSubmitting: boolean;
  isFormValid: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting, isFormValid }) => {
  const { isAgreed } = useAgreementContext();

  const currentButtonStyle = isAgreed && !isSubmitting ? buttonStyle : disabledButtonStyle;

  return (
    <button
      type="submit"
      style={currentButtonStyle}
      disabled={!isAgreed || isSubmitting}
    >
      {isSubmitting ? (
        <>
          <FaSpinner className="spinner" /> Submitting...
        </>
      ) : isAgreed ? (
        'Submit'
      ) : (
        '⚠️ Agree to Contract'
      )}
    </button>
  );
};

export default SubmitButton;
