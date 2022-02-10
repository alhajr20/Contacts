import * as types from './actionTypes';

const initialState = {
    contacts: [],
}

const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_CONTACT:
            let newContactsList = [...state.contacts, action.payload];
            return {
                ...state,
                contacts: newContactsList,
            }
        case types.DELETE_CONTACT:
            const newContacts = state.contacts.filter(item => item.id !== action.payload);
            return {
                ...state,
                contacts: newContacts,
            }
        case types.CONTACTS_LIST:
            let contactsList = [...action.payload]
            return {
                ...state,
                contacts: contactsList,
            }
        case types.UPDATE_CONTACTS:
            state.contacts.forEach(item => {
                if (item.id === action.payload.id) {
                    item['name'] = action.payload.name;
                    item['number'] = action.payload.number;
                }
            });
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default contactsReducer;