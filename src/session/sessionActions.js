export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export function login(credentials) {
    return {
        types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
        payload: {
            request: {
                url: '/Users/login',
                method: 'POST',
                data: credentials,
            }
        }
    };
}
