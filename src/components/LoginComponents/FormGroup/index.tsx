import { memo } from 'react';
import './index.css'; // Import the CSS file

const FormGroup = (props:any) => {
  return (
    <div className={`form-group ${props.inline ? 'inline' : ''}`} {...props}>
      {props.children}
    </div>
  );
};

export default memo(FormGroup);