
import React, { forwardRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { signaturePadContainer, signatureCanvas } from '../styles/signup';

interface SignaturePadComponentProps {
    onClear: () => void; // Add a prop for the clear action
}


const SignaturePadComponent = forwardRef<SignatureCanvas, SignaturePadComponentProps>((props, ref) => {
  // const sigCanvasRef = useRef<SignatureCanvas>(null);
  
  const handleClearClick = () => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.clear();
      props.onClear(); 
    }
  };


  return (
    <div>
      <div style={signaturePadContainer}>
        <SignatureCanvas
          penColor='gold'
          canvasProps={{ style: signatureCanvas }}
          ref={ref}
          // ... other props
        />
      </div>
      <p>
        <button type='button' onClick={handleClearClick}>Clear</button>
      </p>
    </div>
  );
});

export default SignaturePadComponent;
