import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { buttonStyle, disabledButtonStyle } from '../styles/signup';

interface SubmitButtonProps {
  isSubmitting: boolean;
  isFormValid: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting, isFormValid }) => {
  const currentButtonStyle = isFormValid ? buttonStyle : disabledButtonStyle;

  return (
    <button type="submit" style={currentButtonStyle} disabled={!isFormValid || isSubmitting}>
      {isSubmitting ? (
        <>
          <FaSpinner className="spinner" /> Loading...
        </>
      ) : (
        isFormValid ? 'Sign Up' : '⚠️ Agree to Contract'
      )}
    </button>
  );
};

export default SubmitButton;
