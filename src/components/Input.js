import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledInput = styled.input`
    width: 320px;
    height: ${props => props.theme.size['large']};
    outline: none;
    border:${props => `2px solid ${props.theme.color.main}`};
    border-radius: 8px;
    font-size: ${props => props.theme.size.small};
`;

const Input = ({ type, name, value, onChange, placeholder }) => {
    return (
        <StyledInput type={type} name={name} placeholder={placeholder} value={value} onChange={(e) => onChange(e, name)} />
    )
}

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default Input
