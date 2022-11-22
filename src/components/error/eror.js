import React from 'react'
import { Alert } from 'antd';
import 'antd/dist/antd.css'


function Error() {
  return (
    <Alert
      message="Error"
      description="Something went wrong."
      type="error"
      showIcon
    />
  )
}

export default Error