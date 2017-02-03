import config from './config'

export default {
    axios: {
        baseURL: config.apiBase,
        responseType: 'json',
    },
    // //opt
    // options: {
    //     interceptors: {
    //         request: [
    //             (getState, config) => {
    //                 if (getState().user.token) {
    //                     config.headers['Authorization'] = 'Bearer ' + getState().user.token
    //                 }
    //
    //                 return config
    //             }
    //         ],
    //         response: [
    //             (getState, response) => {
    //
    //
    //                 return response
    //             }
    //         ]
    //     }
    // }
};
