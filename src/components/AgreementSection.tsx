import React from 'react';
import SignaturePad from './SignaturePad';
import { labelStyle } from '../styles/signup';
import { useAgreementContext } from './context/AgreementContext';
import ReactSignatureCanvas from 'react-signature-canvas';

interface AgreementSectionProps {
  parentSignaturePadRef: React.Ref<ReactSignatureCanvas>;
  handleContractClick: () => void;
  handleConductClick: () => void;
}

const AgreementSection: React.FC<AgreementSectionProps> = ({
  parentSignaturePadRef,
  handleContractClick,
  handleConductClick,
}) => {
  const { isAgreed, setIsAgreed } = useAgreementContext();

  return (
    <>
      <div style={labelStyle}>
        <label>
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
            style={{ marginRight: '10px' }}
          />
          I agree to: 
          <a href="#!" style={{ color: 'gold', marginLeft: '5px' }} onClick={handleContractClick}>
            Contract
          </a> & 
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
