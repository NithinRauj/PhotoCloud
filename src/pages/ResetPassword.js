import React, { Fragment, createRef, useState } from 'react';
import { FormBox, Content } from '../components/AuthComponents'
import Background from '../components/Background';
import Input from '../components/Input';
import Text from '../components/Text';
import Button from '../components/Button';
import { auth } from '../firebase/firebase-config';

const ResetPassword = (props) => {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const emailRef = createRef();

    const goTo = (path) => {
        const { history } = props;
        history.push(path);
    }

    const onReset = async () => {
        setError('');
        if (!emailRef.current.value) {
            setError('Email field is mandatory');
        } else {
            try {
                setError('');
                await auth.sendPasswordResetEmail(emailRef.current.value);
                setMessage('Check your mail to reset passowrd');
            } catch (err) {
                setError('Unable to reset password');
            }
        }
    }

    return (
        <Fragment>
            <Background />
            <FormBox>
                <Content>
                    <Text size={'2xl'} weight={'medium'}>PhotoCloud</Text>
                    <Text size={'medium'} weight={'medium'} margin={'0px 20px'}>Reset Password</Text>
                    {error && <Text color={'error'}>{error}</Text>}
                    {message && <Text color={'success'}>{message}</Text>}
                    <Text size={'xs'}>Please enter the email address to recover your password</Text>
                    <Input type='email' name='email' placeholder='Email' reference={emailRef} />
                    <Button width={'150px'} height={'large'} text={'Reset Password'} bgColor={'darkShade'} textColor={'lightShade'} onClick={onReset} />
                    <Text size={'xs'} weight={'bold'} cursor={'pointer'} onClick={() => goTo('/signin')}>Go back to Sign In</Text>
                </Content>
            </FormBox>
        </Fragment>
    )
}

export default ResetPassword
