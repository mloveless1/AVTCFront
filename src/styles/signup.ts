  // Inline styles
  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    padding: '20px',
    maxWidth: '500px',
    backgroundColor: '#000',
    color: '#FFD700',
    borderRadius: '8px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', // Optional: Adds depth with shadow
  };

  const inputStyle: React.CSSProperties = {
    
    margin: '10px 0',
    padding: '10px',
    width: 'calc(100% - 20px)',
    backgroundColor: 'white',
    border: '2px solid #FFD700',
    color: 'black',
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    color: '#FFD700',
  };

  const buttonStyle: React.CSSProperties = {
    ...inputStyle,
    backgroundColor: '#FFD700',
    color: 'black',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px',
  };

  // Styles for the disabled state of the submit button
  const disabledButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#ccc', // Grey color
    color: 'black',
    cursor: 'not-allowed',
    opacity: 0.7, // Make the button look faded
  };  

  const athleteContainerStyle: React.CSSProperties = {
  border: '1px solid #FFD700', // Add a border around the container
  padding: '10px', // Optional: Add padding to create space between the border and inputs
  marginBottom: '10px', // Optional: Add margin to separate athlete containers
};

export { formStyle, inputStyle, labelStyle, buttonStyle, disabledButtonStyle, athleteContainerStyle }