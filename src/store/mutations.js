import Vue from 'vue';

export default {
    editUser(state, user) {
        editUser(state, user);
    },

    login(state, user) {
        login(state, user);
    },

    register(state, user) {
        register(state, user);
    },

    logout(state, user) {
        logout(state, user);
    },

    adminLogin(state, user) {
        adminLogin(state, user);
    },

    adminLogout(state, user) {
        adminLogout(state, user);
    },

    getCourses(state, category) {
        getCourses(state, category);
    },

    getCourseLevels(state, level) {
        getCourseLevels(state, level);
    },

    getCourseDetails(state, course) {
        getCourseDetails(state, course);
    },

    getUserPerformance(state, performance) {
        getUserPerformance(state, performance);
    },

    postUserPerformance(state, performance) {
        postUserPerformance(state, performance);
    },

    getPerformances(state, performance) {
        getPerformances(state, performance);
    },

    getLineBotQR(state) {
        getLineBotQR(state);
    },

    postUserPaymentConfirmation(state, payment) {
        postUserPaymentConfirmation(state, payment);
    }
}

function editUser(state, user) {
    Vue.set(state, 'userProfile', user);
    localStorage.setItem('userProfile', JSON.stringify(user));
}

function login(state, user) {
    Vue.set(state, 'userProfile', user);
    localStorage.setItem('userProfile', JSON.stringify(user));
}

function register(state, user) {
    Vue.set(state, 'userProfile', user);
    localStorage.setItem('userProfile', JSON.stringify(user));
}

function logout(state) {
    Vue.set(state, 'userProfile', null);
    localStorage.setItem('userProfile', null);
}

function adminLogin(state, user) {
    Vue.set(state, 'admin', user);
    localStorage.setItem('admin', JSON.stringify(user));
} 

function adminLogout(state) {
    Vue.set(state, 'admin', null);
    localStorage.setItem('admin', null);
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

function getUserPerformance(state, performance) {
    Vue.set(state, 'userPerformance', performance);
}

function postUserPerformance(state, performance) {
    // Vue.set(state, 'userPerformance', performance);
}

function getPerformances(state, performance) {
    Vue.set(state, 'performances', performance);
}

function getLineBotQR(state) {

}

function postUserPaymentConfirmation(state, payment) {

}