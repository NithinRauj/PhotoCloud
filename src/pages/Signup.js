import React, { Fragment, useState, createRef } from 'react';
import { FormBox, Content } from '../components/AuthComponents'
import Background from '../components/Background';
import Input from '../components/Input';
import Text from '../components/Text';
import Button from '../components/Button';
import { auth } from '../firebase/firebase-config';

const Signup = (props) => {
    const emailRef = createRef();
    const passwordRef = createRef();
    const rePasswordRef = createRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const goTo = (path) => {
        const { history } = props;
        history.push(path);
    }

    const onSubmit = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const rePassword = rePasswordRef.current.value;
        if (!email && !password && !rePassword) {
            return setError('All fields are mandatory');
        }
        if (password !== rePassword) {
            return setError('Passwords don\'t match');
        }
        try {
            setLoading(true);
            setError('');
            await auth.createUserWithEmailAndPassword(email, password);
            goTo('/');
        } catch (err) {
            console.log(err);
            setError('Failed to create account');
        }
        setLoading(false);
    }
    return (
        <Fragment>
            <Background />
            <FormBox>
                <Content>
                    <Text size={'2xl'} weight={'medium'}>PhotoCloud</Text>
                    <Text size={'medium'} weight={'medium'}>Sign Up</Text>
                    {error && <Text color={'error'}>{error}</Text>}
                    <Input type='email' name='email' placeholder='Email' reference={emailRef} />
                    <Input type='password' name='password' placeholder='Password' reference={passwordRef} />
                    <Input type='password' name='re-password' placeholder='Reenter Password' reference={rePasswordRef} />
                    <Button width={'130px'} height={'large'} text={'Sign Up'} isDisabled={loading}
                        bgColor={'darkShade'} textColor={'lightShade'} onClick={onSubmit} />
                    <Text size={'xs'}>Already have an account?{' '}
                        <Text size={'xs'} weight={'bold'} cursor={'pointer'} onClick={() => goTo('/signin')}>
                            Sign In
                        </Text>
                    </Text>
                </Content>
            </FormBox>
        </Fragment>
    )
}

export default Signup
