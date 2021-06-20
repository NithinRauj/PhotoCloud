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

const Input = ({ type, name, placeholder, reference }) => {
    return (
        <StyledInput type={type} name={name} ref={reference} placeholder={placeholder} />
    )
}

Input.propTypes = {
    reference: PropTypes.object,
    type: PropTypes.string,
    name: PropTypes.string
}

export default Input
