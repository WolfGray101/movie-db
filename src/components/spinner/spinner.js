import React from 'react'
import { Alert, Spin } from 'antd';
import 'antd/dist/antd.css'

// import './spinner.css'
 const Spinner = () => {
 
    return (
//       <div className="random-planet jumbotron rounded">
// <div className="loadingio-spinner-double-ring-8butqh2oeqq lds-css">
// <div className="ldio-v8n5848stah">
// <div></div>
// <div></div>
// <div><div></div></div>
// <div><div></div></div>
// </div></div>
// </div>
<Spin tip="Loading...">
    <Alert
      message="Wait a few momements"
      description="Loading in progress"
      type="info"
    />
  </Spin>
    )
  
}
export default Spinner