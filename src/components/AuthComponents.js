import styled from "styled-components";

export const FormBox = styled.div`
    width: 500px;
    max-width: 500px;
    height: 550px;
    border:${props => `4px solid ${props.theme.color.darkShade}`};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
`;

export const Content = styled.div`
    height: 525px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;