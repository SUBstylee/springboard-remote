const INITIAL_STATE = {
    face: ['┐( ˘_˘ )┌', 'gray']
};

const moodReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'HAPPY':
            return { ...state, face: action.payload };
        case 'SAD':
            return { ...state, face: action.payload };
        case 'ANGRY':
            return { ...state, face: action.payload };
        case 'CONFUSED':
            return { ...state, face: action.payload };
        default:
            return state;
    };
};