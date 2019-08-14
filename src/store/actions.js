import axios from 'axios';
import {BASE_URL} from '../api/config/config.js';

export const login = async ({commit}, payload) => {
    try {
        const response = await axios.post(BASE_URL + "/login", payload.user)
        commit('login', response.data)
        return Promise.resolve(response.data)
    } catch (e) {
        return Promise.reject(e)
    }
}

export const adminLogin = async ({commit}, payload) => {
    try {
        const response = await axios.post(BASE_URL + "/admin-login", payload.user)
        commit('adminLogin', response.data)
        return Promise.resolve(response.data)
    } catch (e) {
        return Promise.reject(e)
    }
}

export const register = async ({commit}, payload) => {
    try {
        const response = await axios.post(BASE_URL + "/register", payload.user)
        commit('register', response.data)
        return Promise.resolve(response.data)
    } catch (e) {
        return Promise.reject(e)
    }
}

export const logout = ({commit}, payload) => {
    // try {
    //     const response = await axios.post(BASE_URL + "/logout", payload.user)
    //     commit('register', response.data.response)
    //     return Promise.resolve(response.data.response)
    // } catch (e) {
    //     return Promise.reject(e)
    // }
    commit('logout')
    return true
}

export const adminLogout = ({commit}, payload) => {
    // try {
    //     const response = await axios.post(BASE_URL + "/logout", payload.user)
    //     commit('register', response.data.response)
    //     return Promise.resolve(response.data.response)
    // } catch (e) {
    //     return Promise.reject(e)
    // }
    commit('adminLogout')
    return true
}

export const editUser = async ({commit}, payload) => {
    try {
        const response = await axios.put(BASE_URL + "/edituser", payload.user)
        commit('editUser', response.data)
        return Promise.resolve(response.data)
    } catch (e) {
        return Promise.reject(e)
    }
}

export const getAllUsers = async ({commit}) => {
    try {
        const response = await axios.get(BASE_URL + "/users")
        return Promise.resolve(response.data)
    } catch (e) {
        return Promise.reject(e)
    }
}

export const validateUser = async ({commit}, payload) => {
    try {
        const response = await axios.post(BASE_URL + "/validate", payload.targetedUser)
        return Promise.resolve(response.data)
    } catch (e) {
        return Promise.reject(e)
    }
}

export const rejectUser = async ({commit}, payload) => {
    try {
        const response = await axios.post(BASE_URL + "/reject", payload.targetedUser)
        return Promise.resolve(response.data)
    } catch (e) {
        return Promise.reject(e)
    }
}

export const getCourses = async ({commit}) => {
    try {
        const response = await axios.get(BASE_URL + "/courses")
        commit('getCourses', response.data)
        return Promise.resolve(response.data)
    } catch (e) {
        return Promise.reject(e)
    }
}

export const getCourseLevels = async ({commit}, payload) => {
    try {
        const response = await axios.get(BASE_URL + "/courses/" + payload)
        commit('getCourseLevels', response.data)
        return Promise.resolve(response.data)
    } catch (e) {
        return Promise.reject(e)
    }
}

export const getCourseDetails = async ({commit}, payload) => {
    try {
        const response = await axios.get(BASE_URL + "/courses/" + payload)
        commit('getCourseDetails', response.data)
        return Promise.resolve(response.data)
    } catch (e) {
        return Promise.reject(e)
    }
}

export const getUserPerformance = async ({commit}, payload) => {
    try {
        const response = await axios.get(BASE_URL + "/performance/" + payload)
        commit('getUserPerformance', response.data);
        return Promise.resolve(response.data)
    } catch (e) {
        return Promise.reject(e)
    }
}

export const postUserPerformance = async ({commit}, payload) => {
    try {
        const response = await axios.post(BASE_URL + "/performance")
        commit('postUserPerformance', response.data);
        return Promise.resolve(response.data)
    } catch (e) {
        return Promise.reject(e)
    }
}

export const getPerformances = async ({commit}) => {
    try {
        const response = await axios.get(BASE_URL + "/performance")
        commit('getPerformances', response.data);
        return Promise.resolve(response.data)
    } catch (e) {
        return Promise.reject(e)
    }
}