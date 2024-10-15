import React, { MutableRefObject, RefObject } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { athleteContainerStyle, labelStyle, inputStyle, buttonStyle } from '../styles/signup';
import SignaturePad from './SignaturePad'

interface AthleteInfoFormProps {
  athletes: any[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  isRemovable: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => void;
  signaturePadRefs: React.MutableRefObject<(SignatureCanvas | null)[]>;
}

const AthleteInfoForm: React.FC<AthleteInfoFormProps> = ({
  athletes, onAdd, onRemove, isRemovable, onChange, signaturePadRefs,
}) => {
  return (
    <>
      {athletes.map((athlete, index) => (
        <div key={index} style={athleteContainerStyle}>
          <div style={labelStyle}>
            <label>
              Athlete's First Name *:
              <input
                type="text"
                name="athleteFirstName"
                value={athlete.athleteFirstName}
                onChange={(e) => onChange(e, index)}
                style={inputStyle}
              />
            </label>
          </div>
          <div style={labelStyle}>
            <label>
              Athlete's Last Name *:
              <input
                type="text"
                name="athleteLastName"
                value={athlete.athleteLastName}
                onChange={(e) => onChange(e, index)}
                style={inputStyle}
              />
            </label>
          </div>

          <p>Athlete Signature *:</p>
          <SignaturePad ref={(el) => (signaturePadRefs.current[index] = el)} onClear={() => console.log('Signature pad cleared')} />

          {isRemovable && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              style={buttonStyle}
            >
              Remove Athlete
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={onAdd} style={buttonStyle}>
        Add Another Athlete
      </button>
    </>
  );
};

export default AthleteInfoForm;
