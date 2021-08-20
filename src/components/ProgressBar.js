import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Root = styled.div`
    width: 300px;
    height: 25px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid ${props => props.theme.color['darkShade']};
`;

const Bar = styled.div`
    width: ${props => props.progressNumber}px;
    height: 25px;
    border-radius: 10px;
    background-color: ${props => props.theme.color['darkShade']};
`;

const ProgressBar = ({ progressNumber }) => {
    return (
        <Root>
            <Bar progressNumber={progressNumber * 3}></Bar>
        </Root>
    )
}

ProgressBar.propTypes = {
    progressNumber: PropTypes.number
};

export default ProgressBar;
