import React from 'react';
import SignatureCanvas from 'react-signature-canvas';
import {
  athleteContainerStyle,
  labelStyle,
  inputStyle,
  buttonStyle,
} from '../styles/signup';
import SignaturePad from './SignaturePad';

interface AthleteInfoFormProps {
  athletes: any[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  isRemovable: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => void;
  signaturePadRefs: React.MutableRefObject<(SignatureCanvas | null)[]>;
}

const AthleteInfoForm: React.FC<AthleteInfoFormProps> = ({
  athletes,
  onAdd,
  onRemove,
  isRemovable,
  onChange,
  signaturePadRefs,
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

          <div style={labelStyle}>
            <label>
              Suffix [Optional]:
              <select
                name="suffixName"
                value={athlete.suffixName}
                onChange={(e) => onChange(e, index)}
                style={inputStyle}
              >
                <option value="">Select here</option>
                <option value="Jr.">Jr.</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
              </select>
            </label>
          </div>

          <div style={labelStyle}>
            <label>
              Date of Birth *:
              <input
                type="date"
                name="dateOfBirth"
                value={athlete.dateOfBirth}
                onChange={(e) => onChange(e, index)}
                style={inputStyle}
              />
            </label>
          </div>

          <div style={labelStyle}>
            <label>
              Medical concerns:
              <input
                type="text"
                name="medicalConditions"
                placeholder="Medical Concerns"
                value={athlete.medicalConditions}
                onChange={(e) => onChange(e, index)}
                style={inputStyle}
              />
            </label>
          </div>

          <div style={labelStyle}>
            <label>
              Last Physical *:
              <input
                type="date"
                name="lastPhysical"
                value={athlete.lastPhysical}
                onChange={(e) => onChange(e, index)}
                style={inputStyle}
              />
            </label>
          </div>

          <div style={labelStyle}>
            <label>
              Gender *:
              <select
                name="gender"
                value={athlete.gender}
                onChange={(e) => onChange(e, index)}
                style={inputStyle}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div>

          <div style={labelStyle}>
            <label>
              Returner Status *:
              <select
                name="returner_status"
                value={athlete.returner_status}
                onChange={(e) => onChange(e, index)}
                style={inputStyle}
              >
                <option value="new">New</option>
                <option value="returner">Returner</option>
              </select>
            </label>
          </div>

          <p>Athlete Signature *:</p>
          <SignaturePad
            ref={(el) => (signaturePadRefs.current[index] = el)}
            onClear={() => console.log('Signature pad cleared')}
          />

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
