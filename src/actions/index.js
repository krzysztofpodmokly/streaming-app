import { SIGN_IN, SIGN_OUT } from './types';
// Action creators
// 1. Signing User In
// 2. Signing User Out

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};