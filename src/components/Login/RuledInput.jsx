import React from 'react';

const RuledInput =
  ({ type, fieldDisplayName, value, changeHandler, isValid, errorMessage }) => {
    let className = value.length > 0 ? 'typed' : '';
    if (!isValid && value.length > 0) {
      className += ' invalid';
    } else if (isValid) {
      className += ' valid';
    }
    return (
      <div className="snutt__inputWrapper signup">
        <input
          className={className}
          onChange={changeHandler}
          placeholder={fieldDisplayName}
          value={value}
          type={type}
        />
        {/* <div className="snutt__labelWrapper">
          {fieldDisplayName}
        </div> */}
        <div className="snutt__inputError">
          {errorMessage}
        </div>
      </div>
    );
  };

export default RuledInput;
