import React, { Ref } from 'react';
import SignaturePad from './SignaturePad';
import { labelStyle, buttonStyle } from '../styles/signup';
import ReactSignatureCanvas from 'react-signature-canvas';

interface AgreementSectionProps {
  isAgreed: boolean;
  onAgreementChange: (isChecked: boolean) => void;
  parentSignaturePadRef: Ref<ReactSignatureCanvas>;
  handleContractClick: () => void;
  handleConductClick: () => void;
}

const AgreementSection: React.FC<AgreementSectionProps> = ({
  isAgreed,
  onAgreementChange,
  parentSignaturePadRef,
  handleContractClick,
  handleConductClick,
}) => {
  return (
    <>
      <div style={labelStyle}>
        <label>
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={(e) => onAgreementChange(e.target.checked)}
            style={{ marginRight: '10px' }}
          />
          I agree to: 
          <a href="#!" style={{ color: 'gold', marginLeft: '5px' }} onClick={handleContractClick}>
            Contract
          </a> 
          & 
          <a href="#!" style={{ color: 'gold', marginLeft: '5px' }} onClick={handleConductClick}>
            Code of Conduct
          </a>
        </label>
      </div>

      <p>Parent Signature *:</p>
      <SignaturePad ref={parentSignaturePadRef} onClear={() => console.log('Parent signature cleared!')} />
    </>
  );
};

export default AgreementSection;
