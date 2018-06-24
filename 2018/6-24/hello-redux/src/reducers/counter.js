const counter = (state = 0, action = {}) => {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMETN':
            return state - 1;
        default: 
            return state
    }
}

export default counter