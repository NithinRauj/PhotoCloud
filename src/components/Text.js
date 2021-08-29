import styled from "styled-components";
import PropTypes from 'prop-types';

const Text = styled.label`
    font-family: Ubuntu,sans-serif;
    font-size:${props => props.theme.size[props.size]};
    font-weight:${props => props.theme.weight[props.weight]};
    text-align: ${props => props.align};
    cursor: ${props => props.cursor};
    color:${props => props.theme.color[props.color]};
    margin:${props => props.margin};
`;

export default Text;

Text.propTypes = {
    size: PropTypes.string,
    weight: PropTypes.string,
    align: PropTypes.string,
    cursor: PropTypes.string,
    color: PropTypes.string,
    margin: PropTypes.string
};

Text.defaultProps = {
    size: 'small',
    weight: 'regular',
    cursor: 'default',
    color: 'black',
    margin: '0px'
};