import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsList } from '../../redux/actions';
import { Navigate } from 'react-router-dom';

import './style.css';

import Item from '../item';
import Form from '../form';
import useFetch from '../../hooks/useFetch';

const Contacts = () => {
    const [foundText, setFoundText] = useState('');

    const { request } = useFetch();

    const dispatch = useDispatch();
    const { contacts } = useSelector(state => state.contactsReducer);
    const { user } = useSelector(state => state.authReducer);

    useEffect(() => {
        request("http://localhost:3001/contacts")
            .then(data => {
                console.log(data);
                const newData = data.filter(item => item.user_id === user.id);
                console.log(newData);

                dispatch(contactsList(newData))
            })
            .catch(() => console.log('Error'));
    }, []);

    if (!user.activated) {
        return <Navigate to="/login" />
    }

    const foundContacts = contacts.filter(item => item.name.toLowerCase().includes(foundText.toLowerCase()));

    return (
        <div className='contacts'>
            <div className='container'>
                <div className='contacts__wrapper'>
                    <div className='contacts__list'>
                        <form className='search'>
                            <input 
                                type="text"
                                placeholder='Search'
                                value={foundText}
                                onChange={(e) => setFoundText(e.target.value)}
                            />
                        </form>
                        {foundContacts.length ? foundContacts.map((item, i) => (
                            <Item name={item.name} number={item.number} id={item.id} key={i} />
                        )) : <div style={{marginTop: '20px'}}>You don't have contacts yet</div>}
                    </div>
                    <Form />
                </div>
            </div>
        </div>
    );
}

export default Contacts;