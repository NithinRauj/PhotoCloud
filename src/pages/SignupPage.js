import React, { Fragment, useState } from 'react';
import { FormBox, Content } from '../components/AuthComponents'
import Background from '../components/Background';
import Input from '../components/Input';
import Text from '../components/Text';
import Button from '../components/Button';

const SignupPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const onChange = (e) => {
        const value = e.target.value;
        switch (e.target.name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 're-password':
                setRePassword(value);
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
                    <Text size={'medium'} weight={'medium'}>Sign Up</Text>
                    <Input type='email' name='email' placeholder='Email' value={email} onChange={onChange} />
                    <Input type='password' name='password' placeholder='Password' value={password} onChange={onChange} />
                    <Input type='password' name='re-password' placeholder='Reenter Password' value={rePassword} onChange={onChange} />
                    <Button width={'130px'} height={'large'} text={'Sign Up'} bgColor={'main'} textColor={'lightShade'} />
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

export default SignupPage
