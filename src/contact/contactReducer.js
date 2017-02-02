import {CONTACTS_RECEIVED} from './contactActions'
export default (state = [], action) => {
    switch (action.type) {
        case CONTACTS_RECEIVED:
            return action.contacts;
        default:
            return state
    }
};
