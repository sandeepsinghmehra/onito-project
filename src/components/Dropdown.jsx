import React from 'react'
import Select from 'react-select';

const customStyles = {
    control: (provided) => ({
        ...provided,
        minHeight: '32px',
        height: '32px',
        fontSize: '12px',
        padding: '0 3px',
    }),

    valueContainer: (provided) => ({
        ...provided,
        height: '32px',
        padding: '0 3px',
        fontSize: '12px',
    }),

    input: (provided) => ({
        ...provided,
        margin: '0px',
        padding: '0 3px',
        fontSize: '12px',
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none',
        fontSize: '12px', 
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '32px',
      fontSize: '12px',
    }),
    menu: (provided) => ({
        ...provided,
        fontSize: '12px',
        padding: '0px',
    }),
};
export const Dropdown =  React.forwardRef(({options, placeholder, defaultValue, name, ...rest}, ref) =>{
  return (
    <>
        <Select
            name={name}
            options={options}
            defaultValue={defaultValue}
            styles={customStyles}
            placeholder={placeholder}
            {...rest}
            ref={ref}
        />
    </>
  )
});