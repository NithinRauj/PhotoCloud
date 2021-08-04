import React from 'react';
import styled from 'styled-components';
import notFound from '../assets/not-found.svg';
import Text from './Text';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
    img{
        width: 550px;
        height: 550px;
    }
`;

const NoImagesFound = props => {
    return (
        <Root>
            <Text>No Photos found.Upload a photo by clicking on the <b>Upload</b> button</Text>
            <img src={notFound} alt='no images found' />
        </Root>
    )
}


export default NoImagesFound;
