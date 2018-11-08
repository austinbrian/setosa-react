import React from 'react';

const InputField = ({ fieldName, onDataChange }) => {

    return(
        <div>
            <input
                className='pa3 ba b--green bg-lightest-blue'
                type='search'
                placeholder={fieldName}
                onChange={onDataChange}
/>
        </div>
    )

    }

export default InputField;
