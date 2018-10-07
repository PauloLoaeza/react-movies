import React from 'react';

const Input = ({ name, label, error, ...params }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...params}
        id={name}
        name={name}
        className={'form-control ' + (error ? 'is-invalid' : '')}
      />
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default Input;
