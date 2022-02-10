import * as types from './actionTypes';

export const addContact = (contact) => {

    return {
        type: types.ADD_CONTACT,
        payload: contact,
    }
}

export const deleteContact = (contact) => {

    return {
        type: types.DELETE_CONTACT,
        payload: contact,
    }
}

export const updateContacts = (contact) => {

    return {
        type: types.UPDATE_CONTACTS,
        payload: contact,
    }
}

export const contactsList = (contacts) => {

    return {
        type: types.CONTACTS_LIST,
        payload: contacts,
    }
}

export const loginAccount = (user) => {

    return {
        type: types.LOGIN,
        payload: user,
    }
}

export const logoutAccount = () => {

    return {
        type: types.LOGOUT,
    }
}