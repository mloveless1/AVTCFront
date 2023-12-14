  // Inline styles
  export const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    padding: '20px',
    maxWidth: 'calc(100% - 30px)',
    backgroundColor: '#000',
    color: '#FFD700',
    borderRadius: '8px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', // Optional: Adds depth with shadow
  };

  export const inputStyle: React.CSSProperties = {
    margin: '10px 0',
    padding: '10px',
    width: 'calc(100% - 30px)',
    backgroundColor: 'white',
    border: '2px solid #FFD700',
    color: 'black',
  };
  
  export const invalidInputStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: 'red',
  }

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

  // Styles for the disabled state of the submit button
 export const disabledButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#ccc', // Grey color
    color: 'black',
    cursor: 'not-allowed',
    opacity: 0.7, // Make the button look faded
  };  

export const athleteContainerStyle: React.CSSProperties = {
    border: '1px solid #FFD700', // Add a border around the container
    padding: '10px', // Optional: Add padding to create space between the border and inputs
    marginBottom: '10px', // Optional: Add margin to separate athlete containers
};
export const signaturePadContainer: React.CSSProperties = {
    border: '2px solid #FFD700',
    display: 'inline-block',
    width: 'calc(100% - 30px)',
  };
  
export const signatureCanvas: React.CSSProperties = {
    width: '400px',
    height: '100px',
    border: '1px solid #000'
  };

export default { formStyle, inputStyle, invalidInputStyle, labelStyle, buttonStyle, disabledButtonStyle, athleteContainerStyle, signaturePadContainer, signatureCanvas }