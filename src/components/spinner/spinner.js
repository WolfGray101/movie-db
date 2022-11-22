import React from 'react'
import { Alert, Spin } from 'antd';
import 'antd/dist/antd.css'

// import './spinner.css'
function Spinner() {
  return <Spin tip="Loading...">
    <Alert
      message="Wait a few momements"
      description="Loading in progress"
      type="info"
    />
  </Spin>
}
export default Spinner