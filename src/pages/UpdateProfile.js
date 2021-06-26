import React, { Fragment, useState, createRef } from 'react';
import { FormBox, Content } from '../components/AuthComponents'
import Background from '../components/Background';
import Input from '../components/Input';
import Text from '../components/Text';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

const UpdateProfile = (props) => {
    const emailRef = createRef();
    const passwordRef = createRef();
    const rePasswordRef = createRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { currentUser, updateEmail, updatePassword } = useAuth();

    const goTo = (path) => {
        const { history } = props;
        history.push(path);
    }

    const onSubmit = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const rePassword = rePasswordRef.current.value;
        if (password !== rePassword) {
            return setError('Passwords don\'t match');
        }
        setLoading(true);
        setError('');

        try {
            if (email) {
                await updateEmail(email);
            }
            if (password) {
                await updatePassword(password);
            }
            goTo('/');
        } catch (err) {
            setError('Unable to update profile');
        } finally {
            setLoading(false);
        }
    }
    return (
        <Fragment>
            <Background />
            <FormBox>
                <Content>
                    <Text size={'2xl'} weight={'medium'}>PhotoCloud</Text>
                    <Text size={'medium'} weight={'medium'}>Update Profile</Text>
                    {error && <Text color={'error'}>{error}</Text>}
                    <Input type='email' name='email' placeholder={currentUser.email} reference={emailRef} />
                    <Input type='password' name='password' placeholder='Leave it blank to remain same' reference={passwordRef} />
                    <Input type='password' name='re-password' placeholder='Leave it blank to remain same' reference={rePasswordRef} />
                    <Button width={'130px'} height={'large'} text={'Update'} isDisabled={loading}
                        bgColor={'main'} textColor={'lightShade'} onClick={onSubmit} />
                    <Button width={'130px'} height={'large'} text={'Cancel'} isDisabled={loading}
                        bgColor={'main'} textColor={'lightShade'} onClick={() => goTo('/')} />
                </Content>
            </FormBox>
        </Fragment>
    )
}

export default UpdateProfile

