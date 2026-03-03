import React from 'react';
import PropTypes from 'prop-types';

export function SearchFormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required,
  min,
  max,
  options,
}) {
  const id = name;
  const labelEl = (
    <label htmlFor={id}>
      {label}
      {required && ' *'}
    </label>
  );
  const errorEl = error ? (
    <span id={`${name}-error`} className="form-error" role="alert">
      {error}
    </span>
  ) : null;

  if (options && Array.isArray(options)) {
    return (
      <div className="form-group">
        {labelEl}
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          <option value="">{placeholder || 'Select...'}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errorEl}
      </div>
    );
  }

  return (
    <div className="form-group">
      {labelEl}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {errorEl}
    </div>
  );
}

SearchFormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string.isRequired, label: PropTypes.string.isRequired })
  ),
};
