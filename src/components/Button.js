import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../components/Text'

const StyledButton = styled.button`
    width: ${props => props.theme.size[props.width] || props.width};
    height: ${props => props.theme.size[props.height] || props.height};
    background-color: ${props => props.theme.color[props.bgColor]};
    color: ${props => props.theme.color[props.textColor]};
    border-radius: 8px;
    border:0px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    ${Text}{
        cursor: inherit;
    }
`;

const Button = ({ width, height, bgColor, textColor, text, onClick, isDisabled }) => {
    return (
        <StyledButton
            width={width}
            height={height}
            bgColor={bgColor}
            textColor={textColor}
            onClick={onClick}
            disabled={isDisabled}
        >
            <Text color={'white'}>{text}</Text>
        </StyledButton>
    )
}

Button.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool
};

export default Button

