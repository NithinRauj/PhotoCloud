import styled from "styled-components";

export const UploadButton = styled.label`
    display: flex;
    position: fixed;
    right:20px;
    bottom: 20px;
    background-color: ${props => props.theme.color.darkAccent};
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    font-family: Ubuntu,sans-serif;
    font-size:${props => props.theme.size['x-base']};
    font-weight: ${props => props.theme.weight.bold};
`;