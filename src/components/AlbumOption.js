import React from 'react';
import styled from "styled-components";
import Text from './Text';

export const AlbumList = styled.div`
    display: none;
    flex-direction: column;
    justify-content: space-around;        
    position: absolute;
    right: -8px;
    top: 35px;
    width: 190px;
    height: fit-content;
    border-radius: 5px;
    z-index: 12;
    background-color: ${props => props.theme.color['white']};
    box-shadow: 0px 0px 10px 2px black;
`;

export const AlbumsContainer = styled.div`
    position: relative;
    -webkit-user-select: none;
`;

const Option = styled.div`
    padding: 15px;
    text-align: center;
    cursor: pointer;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    .material-icons{
        margin: 0px 10px;
        vertical-align: bottom;
    }
    &:hover {
        background-color: ${props => props.theme.color['lightAccent']};
    }
    transition: 0.3s background-color;
    `;

const AlbumOption = ({ name, isCreateOption, onCreate }) => {
    return <Option onClick={onCreate}>
        {isCreateOption && <span className="material-icons">
            create_new_folder
        </span>}
        <Text size={'xs'} cursor={'pointer'}>{name}</Text>
    </Option>
}

export default AlbumOption;