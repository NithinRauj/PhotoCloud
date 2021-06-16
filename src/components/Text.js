import styled from "styled-components";
import PropTypes from 'prop-types';

const Text = styled.label`
    font-family: Ubuntu,sans-serif;
    font-size:${props => props.theme.size[props.size]};
    font-weight:${props => props.theme.weight[props.weight]};
    text-align: ${props => props.align};
`;

export default Text;

Text.propTypes = {
    size: PropTypes.string,
    weight: PropTypes.string,
    align: PropTypes.string
};

Text.defaultProps = {
    size: 'small',
    weight: 'regular'
};