export const currentUser = state => {
    return state.userProfile ? state.userProfile : null
}

export const currentAdmin = state => {
    return state.admin ? state.admin : null
}

export const currentCategory = state => {
    return state.currentCategory
}

export const currentLevel = state => {
    return state.currentLevel
}

export const currentCourse = state => {
    return state.currentCourse
}