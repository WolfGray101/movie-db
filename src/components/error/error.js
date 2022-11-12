import React from 'react';
import { Alert } from 'antd';
import 'antd/dist/antd.css'

// import './error.css';
// import icon from './death-star.png';

const ErrorIndicator = () => {
  return (
    <Alert
      message="Error"
      description="This is an error message about Network problem."
      type="error"
      showIcon
    />
  );
};

export default ErrorIndicator;