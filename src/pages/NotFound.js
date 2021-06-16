import React from 'react'
import styled from 'styled-components'
import Text from '../components/Text'

const Root = styled.div`
    height:100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const NotFound = () => {
    return (
        <Root>
            <Text size='2xl'>Page Not Found</Text>
        </Root>
    )
}

export default NotFound
