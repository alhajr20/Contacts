import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { v4 as uuidv4 } from 'uuid';

const SignUp = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [loginError, setLoginError] = useState('');

    const { request } = useFetch();

    const onSubmitSign = (e) => {
        e.preventDefault();

        if (!login || !password) {
            return setLoginError('Something wrong');
        }

        const newUser = {
            id: uuidv4(),
            username: login,
            password: password,
        }

        request("http://localhost:3001/users", "POST", JSON.stringify(newUser))
            .then(res => setSuccess('You created account, now you can login'))
            .catch(err => console.log(err));

        setLogin('');
        setPassword('');
    }

    return (
        <>
            <div className='auth'>
                <div className='auth__wrapper'>
                    <h2>Create account</h2>
                    {loginError ? <div className='error' style={{color: 'red', margin: '12px 0'}}>{loginError}</div> : ''}
                    {success ? <div className='success' style={{color: 'green', margin: '12px 0'}}>{success}</div> : ''}
                    <form className='auth__form' onSubmit={onSubmitSign}>
                        <div className='input'>
                            <input 
                                type="text" 
                                placeholder='Login'
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </div>
                        <div className='input'>
                            <input 
                                type="password" 
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit">Sign</button>
                    </form>
                    <span>Do you already have an account? <Link to="/login">Login</Link></span>
                </div>
            </div>
        </>
    );
}

export default SignUp;