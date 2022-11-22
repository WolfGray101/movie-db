import React from 'react';
import { debounce } from 'lodash'
import { Input } from 'antd'
import './search.css';

function Search ({onLabelChange}) { 

  const inputValue = (e) => {
    let {value} = e.target
    if (!value || value === '') value = 'return' 
    onLabelChange(value)
  }

  return (
    <Input  className="input"
      type='text'
      placeholder="Type to search"
      onChange={debounce(inputValue, 1000)}
    />
  );
}
export default Search




// export default class Search extends Component { 

//   inputValue = (e) => {
//   console.log(e.target.value);
//     this.props.onLabelChange(e.target.value)
//   }

//   render() {
//   return (
//     <form onSubmit={this.onSubmit}>
//     <input
//           type="Text"
//           className="input"
//           placeholder="Type to search"
//           onChange={ debounce(this.inputValue, 500)
//            }
//         />
//       </form>
//   );
//   }
// }