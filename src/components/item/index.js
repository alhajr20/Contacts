import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/actions';
import useFetch from '../../hooks/useFetch';
import './style.css';

import { updateContacts } from '../../redux/actions';

import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const Item = ({ name, number, id }) => {
    const [activeModal, setActiveModal] = useState(false);
    const [nameUpdate, setNameUpdate] = useState('');
    const [numberUpdate, setNumberUpdate] = useState('');

    const dispatch = useDispatch();

    const { request } = useFetch();

    const updateContact = (id) => {
        setActiveModal(true);

        request(`http://localhost:3001/contacts/${id}`)
            .then(res => {
                setNameUpdate(res.name);
                setNumberUpdate(res.number);
            })
            .catch(err => console.log(err));
    }

    const onSumbitUpdate = (e) => {
        e.preventDefault();

        request(`http://localhost:3001/contacts/${id}`, "PATCH", JSON.stringify({
            name: nameUpdate,
            number: numberUpdate,
        }))
            .then(res => dispatch(updateContacts(res)))
            .then(() => {
                setNameUpdate('');
                setNumberUpdate('');
                setActiveModal(false);
            })
            .catch(err => console.log(err));
    }

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/contacts/${id}`, "DELETE")
            .then(res => console.log(res, "Deleted"))
            .then(dispatch(deleteContact(id)))
            .catch(err => console.log(err));
    }, [request]);

    return (
        <>
            <div className='contacts__item'>
                <strong className='name'>{name}</strong>
                <div className='number'>{number}</div>
                <div className='buttons'>
                    <button className='btn delete' onClick={() => onDelete(id)}>
                        <MdDelete/>
                        Delete
                    </button>
                    <button className='btn update' onClick={() => updateContact(id)}>
                        <FaEdit/>
                        Edit
                    </button>
                </div>
            </div>
            <div className={`modal-window ${activeModal ? 'modal-window-active' : ''}`}>
                <div className='mw__wrapper'>
                    <button className='close' onClick={() => setActiveModal(false)}>&times;</button>
                    <form className='mw__form' onSubmit={(e) => onSumbitUpdate(e)}>
                        <div className='input'>
                            <input 
                                type="text" 
                                placeholder='Name'
                                name='name'
                                value={nameUpdate}
                                onChange={(e) => setNameUpdate(e.target.value)} 
                            />
                        </div>
                        <div className='input'>
                            <input type="tel" placeholder='Number' 
                                type="tel" 
                                placeholder='Number'
                                name='number'
                                value={numberUpdate}
                                onChange={(e) => setNumberUpdate(e.target.value)}
                            />
                        </div>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Item;