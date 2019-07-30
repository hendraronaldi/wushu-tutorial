import Vue from 'vue';

export default {
    getCourses(state, category) {
        getCourses(state, category);
    },

    getCourseLevels(state, level) {
        getCourseLevels(state, level);
    },

    getCourseDetails(state, course) {
        getCourseDetails(state, course);
    }
}

function getCourses(state, category) {
    Vue.set(state, 'currentCategory', category);
}

function getCourseLevels(state, level) {
    Vue.set(state, 'currentLevel', level);
}

function getCourseDetails(state, course) {
    Vue.set(state, 'currentCourse', course);
}