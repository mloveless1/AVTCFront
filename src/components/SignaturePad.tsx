import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { signaturePadContainer, signatureCanvas } from '../styles/signup';

interface SignaturePadProps {
  onClear: () => void;
}

// Forward ref to expose methods properly
const SignaturePadComponent = forwardRef<SignatureCanvas, SignaturePadProps>(
  (props, ref) => {
    // Internal ref to store the SignatureCanvas instance
    const sigCanvasRef = useRef<SignatureCanvas | null>(null);

    // Expose the clear method and the SignatureCanvas instance to the parent
    useImperativeHandle(ref, () => {
      if (sigCanvasRef.current === null) {
        throw new Error('SignatureCanvas instance is not available yet.');
      }
      return sigCanvasRef.current;
    });

    const handleClearClick = () => {
      if (sigCanvasRef.current) {
        sigCanvasRef.current.clear(); // Clear the signature
        props.onClear(); // Call parent's onClear handler
      }
    };

    return (
      <div>
        <div style={signaturePadContainer}>
          <SignatureCanvas
            penColor="black"
            canvasProps={{ style: signatureCanvas }}
            ref={sigCanvasRef} // Assign internal ref
          />
        </div>
        <p>
          <button type="button" onClick={handleClearClick}>
            Clear
          </button>
        </p>
      </div>
    );
  }
);

export default SignaturePadComponent;
