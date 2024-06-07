import SearchService from '../services/search-service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { status: { loggedIn: true }, user } : { status: {}, user: null };

export const search = {
    namespaced: true,
    state: initialState,
    actions: {
        id({ commit }, email) {
            console.log('email: ', email)
            return SearchService.idSearch(email).then(
                email => {
                    commit('verificationSuccess', email);
                    return Promise.resolve(email);
                },
                error => {
                    console.log('verificationFailure::', error)
                    commit('verificationFailure');
                    return Promise.reject(error);
                }
            );
        },
        sendVerificationCode({ commit }, email) {
            console.log('email: ', email)
            return SearchService.sendVerificationCode(email).then(
                code => {
                    commit('verificationCode', code);
                    return Promise.resolve(code);
                },
                error => {
                    console.log('verificationCodeFailure::', error);
                    return Promise.reject(error);
                }
            );
        },
    },
    mutations: {
        verificationSuccess(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },
        verificationFailure(state) {
            state.status = {};
            state.user = null;
        },
        verificationCode(state, code) {
            state.code = code;
        }
    }
};
