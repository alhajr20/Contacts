import { useDispatch } from 'react-redux';

import { MdAccountCircle } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import './style.css';

import { logoutAccount } from '../../redux/actions';

const Header = () => {
    const dispatch = useDispatch();

    return (
        <>
            <header className="header">
                <div className='container'>
                    <div className='header__wrapper'>
                        <div className="header__logo">
                            <MdAccountCircle/>
                        </div>
                        <button class="btn logout" onClick={() => dispatch(logoutAccount())}>
                            <FiLogOut/>
                            Logout
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;