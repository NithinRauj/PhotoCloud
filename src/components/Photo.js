import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const PhotosGrid = styled.div`
    margin: 0px 25px 25px;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(350px,1fr));
    grid-gap: 5px;
`;

const Image = styled.img`
    width: 350px;
    height: 350px;
    border-radius: 8px;
    overflow: hidden;
    object-fit: contain;
    cursor: pointer;
`;

const Photo = ({ src }) => {
    return (
        <Image src={src} />
    )
}

Photo.propTypes = {
    src: PropTypes.string,
}

export default Photo

