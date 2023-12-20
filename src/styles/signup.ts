  // Inline styles
  export const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    padding: '20px',
    width: '600px', // Set a specific width for the form
    backgroundColor: '#000',
    color: '#FFD700',
    borderRadius: '8px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
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
export const collapsibleStyle: React.CSSProperties = {
  color: 'gold', // Gold text color
  cursor: 'pointer', // Changes the mouse cursor on hovering over the trigger
  display: 'flex',
  justifyContent: 'space-between', // Positions the text and icon on opposite ends
  alignItems: 'center', // Centers items along the cross axis
  padding: '10px',
  backgroundColor: 'black', // Match the background color to your UI
  border: '2px solid gold', // Gold border as seen in your screenshot
  marginBottom: '5px', // Adds space between collapsibles
  width: '100%', // Full width of the parent (formStyle's width)
  boxSizing: 'border-box', // Include padding and border in the width calculation
};
// Adjust the collapsibleStyle to ensure it fills out the parent container's width.
export const adjustedCollapsibleStyle: React.CSSProperties = {
  ...collapsibleStyle,
  width: '600px', // Make sure it fills the form's width
  boxSizing: 'border-box', // Ensures padding and borders are included in the width
};
export default { formStyle, inputStyle, invalidInputStyle, labelStyle, buttonStyle, disabledButtonStyle, athleteContainerStyle, signaturePadContainer, signatureCanvas, collapsibleStyle, adjustedCollapsibleStyle }