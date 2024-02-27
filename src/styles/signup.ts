// Inline styles
export const formStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  padding: '20px',
  maxWidth: '325px', // Maximum width for larger screens
  backgroundColor: '#000',
  color: '#FFD700',
  borderRadius: '8px',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
};

export const inputStyle: React.CSSProperties = {
  margin: '10px 0',
  padding: '10px',
  width: 'calc(100% - 20px)', // Adjusted for padding
  backgroundColor: 'white',
  border: '2px solid #FFD700',
  color: 'black',
};

export const invalidInputStyle: React.CSSProperties = {
  ...inputStyle,
  borderColor: 'red',
};

export const labelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  color: '#FFD700',
};

export const buttonStyle: React.CSSProperties = {
  ...inputStyle,
  backgroundColor: '#FFD700',
  color: 'black',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '20px',
};

export const disabledButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: '#ccc',
  color: 'black',
  cursor: 'not-allowed',
  opacity: 0.7,
};

export const athleteContainerStyle: React.CSSProperties = {
  border: '1px solid #FFD700',
  padding: '10px',
  marginBottom: '10px',
};

export const signaturePadContainer: React.CSSProperties = {
  border: '2px solid #FFD700',
  display: 'inline-block',
  width: 'calc(100% - 30px)', // Adjusted for border
};

export const signatureCanvas: React.CSSProperties = {
  backgroundColor: 'white', 
  width: '100%',
  maxWidth: '400px', // Maximum width
  height: '100px',
  border: '1px solid #000',
};

export const collapsibleStyle: React.CSSProperties = {
  color: 'gold',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: 'black',
  border: '2px solid gold',
  marginBottom: '5px',
  width: '100%', // Use 100% width for responsiveness
  boxSizing: 'border-box',
};

export const adjustedCollapsibleStyle: React.CSSProperties = {
  ...collapsibleStyle,
  // No need for a separate style if it's the same as collapsibleStyle
};
const styles = {
  formStyle, 
  inputStyle, 
  invalidInputStyle, 
  labelStyle, 
  buttonStyle, 
  disabledButtonStyle, 
  athleteContainerStyle, 
  signaturePadContainer, 
  signatureCanvas, 
  collapsibleStyle, 
  adjustedCollapsibleStyle
};

export default styles;
