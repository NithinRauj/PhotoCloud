import React, { createRef, Fragment, useState } from 'react';
import { FormBox, Content } from '../components/AuthComponents'
import Background from '../components/Background';
import Input from '../components/Input';
import Text from '../components/Text';
import Button from '../components/Button';
import { auth } from '../firebase/firebase-config';

const Signin = (props) => {
    const emailRef = createRef();
    const passwordRef = createRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const goTo = (path) => {
        const { history } = props;
        history.push(path);
    }

    const onSubmit = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if (!email && !password) {
            return setError('All fields are mandatory');
        }
        try {
            setLoading(true);
            setError('');
            await auth.signInWithEmailAndPassword(email, password);
            goTo('/');
        } catch (err) {
            console.log(err);
            setError('Failed to Sign in');
        }
        setLoading(false);
    }

    return (
        <Fragment>
            <Background />
            <FormBox>
                <Content>
                    <Text size={'2xl'} weight={'medium'}>PhotoCloud</Text>
                    <Text size={'medium'} weight={'medium'}>Sign In</Text>
                    {error && <Text color={'error'}>{error}</Text>}
                    <Input type='email' name='email' placeholder='Email' reference={emailRef} />
                    <Input type='password' name='password' placeholder='Password' reference={passwordRef} />
                    <Text size={'xs'} cursor={'pointer'} onClick={() => goTo('/reset')}>Reset Password</Text>
                    <Button width={'130px'} height={'large'} text={'Sign In'} isDisabled={loading}
                        bgColor={'main'} textColor={'lightShade'} onClick={onSubmit} />
                    <Text size={'xs'}>Don’t have an account?{' '}
                        <Text size={'xs'} weight={'bold'} cursor={'pointer'} onClick={() => goTo('/signup')}>
                            Sign Up
                        </Text>
                    </Text>
                </Content>
            </FormBox>
        </Fragment>
    )
}

export default Signin
