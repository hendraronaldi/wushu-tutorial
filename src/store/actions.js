import axios from 'axios';
import {BASE_URL} from '../api/config/config.js';

export const getCourses = async ({commit}, payload) => {
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
        const response = await axios.get(BASE_URL + "/courses")
        commit('getCourseLevels', response.data)
        return Promise.resolve(response.data)
    } catch (e) {
        return Promise.reject(e)
    }
}

export const getCourseDetails = async ({commit}, payload) => {
    try {
        const response = await axios.get(BASE_URL + "/courses")
        commit('getCourseDetails', response.data)
        return Promise.resolve(response.data)
    } catch (e) {
        return Promise.reject(e)
    }
}