import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { loginAccount } from '../../redux/actions';

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();

    const { user } = useSelector(state => state.authReducer);

    const dispatch = useDispatch();

    const { request } = useFetch();

    const onSubmitLogin = (e) => {
        e.preventDefault();

        if (!login || !password) {
            return setLoginError('Something wrong');
        }
        
        request("http://localhost:3001/users")
            .then(res => {
                const foundUser = res.filter(item => {
                    if (item.username === login && item.password === password) {
                        return item;
                    }
                });

                if (foundUser.length === 0) {
                    setLoginError('Something wrong');
                }

                dispatch(loginAccount(foundUser[0]));
            })
            .then(() => navigate("/"))
            .catch(err => console.log(err));

        setLogin('');
        setPassword('');
    } 

    return (
        <div className='auth'>
            <div className='auth__wrapper'>
                <h2>Login to your account</h2>
                {loginError ? <div className='error' style={{color: 'red', margin: '12px 0'}}>{loginError}</div> : ''}
                <form className='auth__form' onSubmit={onSubmitLogin}>
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
                    <button type="submit">Login</button>
                </form>
                <span>Don't you have an account yet? Then <Link to="/signup">sign up</Link></span>
            </div>
        </div>
    );
}

export default Login;