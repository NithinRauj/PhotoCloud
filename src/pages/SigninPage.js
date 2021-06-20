import React, { Fragment, useState } from 'react';
import { FormBox, Content } from '../components/AuthComponents'
import Background from '../components/Background';
import Input from '../components/Input';
import Text from '../components/Text';
import Button from '../components/Button';

const SigninPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChange = (e) => {
        const value = e.target.value;
        switch (e.target.name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
        }
    }

    const goTo = (path) => {
        const { history } = props;
        history.push(path);
    }

    return (
        <Fragment>
            <Background />
            <FormBox>
                <Content>
                    <Text size={'2xl'} weight={'medium'}>PhotoCloud</Text>
                    <Text size={'medium'} weight={'medium'}>Sign In</Text>
                    <Input type='email' name='email' placeholder='Email' value={email} onChange={onChange} />
                    <Input type='password' name='password' placeholder='Password' value={password} onChange={onChange} />
                    <Text size={'xs'} cursor={'pointer'} onClick={() => goTo('/reset')}>Reset Password</Text>
                    <Button width={'130px'} height={'large'} text={'Sign In'} bgColor={'main'} textColor={'lightShade'} />
                    <Text size={'xs'}>Don’t have an account?{' '}
                        <Text size={'xs'} weight={'bold'} cursor={'pointer'} onClick={() => goTo('/')}>
                            Sign Up
                        </Text>
                    </Text>
                </Content>
            </FormBox>
        </Fragment>
    )
}

export default SigninPage
