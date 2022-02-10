import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import { v4 as uuidv4 } from 'uuid';

import { addContact } from '../../redux/actions';

const Form = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const { request } = useFetch();

    const { user } = useSelector(state => state.authReducer);
    const [formError, setFormError] = useState('');
    const dispatch = useDispatch();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (!name || !number) {
            return setFormError('Something wrong');
        }

        setFormError('');

        const newContact = {
            id: uuidv4(),
            name,
            number,
            user_id: user.id,
        }

        request("http://localhost:3001/contacts", "POST", JSON.stringify(newContact))
            .then(res => console.log(res, "Success"))
            .then(dispatch(addContact(newContact)))
            .catch(err => console.log(err));

        setName('');
        setNumber('');
    }

    return (
        <>
            <form className='contacts__form' onSubmit={onSubmitHandler}>
                <h2 className='title'>Add a new contact</h2>
                {formError ? <div className='error' style={{color: 'red', marginBottom: '12px'}}>{formError}</div> : ''}
                <div className='input'>
                    <input 
                        type="text" 
                        placeholder='Name'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div className='input'>
                    <input type="tel" placeholder='Number' 
                        type="tel" 
                        placeholder='Number'
                        name='number'
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </>
    );
}

export default Form;