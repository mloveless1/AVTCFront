import React from 'react';
import { labelStyle, inputStyle, invalidInputStyle } from '../styles/signup';

interface ParentInfoFormProps {
  data: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  invalidFields: { [key: string]: boolean };
}

const ParentInfoForm: React.FC<ParentInfoFormProps> = ({ data, onChange, onBlur, invalidFields }) => {
  const renderInput = (label: string, name: string, type: string = 'text', placeholder?: string) => (
    <div style={labelStyle}>
      <label>
        {label} *:
        <input
          type={type}
          name={name}
          value={data[name]}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          style={invalidFields[name] ? invalidInputStyle : inputStyle}
        />
      </label>
    </div>
  );

  return (
    <>
      {renderInput("Parent's First Name", 'parentFirstName', 'text', 'Enter your first name')}
      {renderInput("Parent's Last Name", 'parentLastName', 'text', 'Enter your last name')}
      <div style={labelStyle}>
        <label>
          Suffix [Optional]:
          <select
            name="suffixName"
            value={data.suffixName}
            onChange={onChange}
            style={inputStyle}
          >
            <option value="">Select here</option>
            <option value="Sr.">Sr.</option>
            <option value="Jr.">Jr.</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </select>
        </label>
      </div>
      {renderInput("Parent's Email", 'email', 'email', 'Enter your email')}
      {renderInput("Parent's Phone Number", 'phoneNumber', 'text', 'Format: ###-###-####')}
      {renderInput('Street Address', 'streetAddress')}
      {renderInput('City', 'city')}
      {renderInput('Zip Code', 'zipcode')}
      {renderInput('Insurance Carrier', 'carrier')}
      {renderInput('Insurance Policy #', 'policyNumber')}
      {renderInput('Emergency Contact', 'emergencyName')}
      {renderInput('Emergency Phone #', 'emergencyPhone', 'text', 'Format: ###-###-####')}
    </>
  );
};

export default ParentInfoForm;
