import React, { Fragment, useState } from 'react';
import { FormBox, Content } from '../components/AuthComponents'
import Background from '../components/Background';
import Input from '../components/Input';
import Text from '../components/Text';
import Button from '../components/Button';

const ResetPage = () => {
    const [email, setEmail] = useState('');

    const onChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    }

    return (
        <Fragment>
            <Background />
            <FormBox>
                <Content>
                    <Text size={'2xl'} weight={'medium'}>PhotoCloud</Text>
                    <Text size={'medium'} weight={'medium'} margin={'0px 20px'}>Reset Password</Text>
                    <Text size={'xs'}>Please enter the registered email address to recover your password</Text>
                    <Input type='email' name='email' placeholder='Email' value={email} onChange={onChange} />
                    <Button width={'150px'} height={'large'} text={'Reset Password'} bgColor={'main'} textColor={'lightShade'} />
                    <Text size={'xs'}>Go back to Sign In</Text>
                </Content>
            </FormBox>
        </Fragment>
    )
}

export default ResetPage
