const SET_SELECTED_ELEMENT = "SET_SELECTED_ELEMENT"
export const setSelectedElement = (id) => ({
    type: SET_SELECTED_ELEMENT,
    id
})

const ADD_ELEMENT = "ADD_ELEMENT"
export const addElement = (element) => ({
    type: ADD_ELEMENT,
    element
})

const REMOVE_ELEMENT = "REMOVE_ELEMENT"
export const removeElement = (id) => ({
    type: REMOVE_ELEMENT,
    id
})

const initState = {
    selectedElement: null,
    elements: []
}

export const editor = (state = initState, action) => {
    switch (action.type) {
        case SET_SELECTED_ELEMENT: return {...state, selectedElement: action.id}
        case ADD_ELEMENT: return {...state, elements: [...state.elements, action.element]}
        case REMOVE_ELEMENT: return {...state, elements: state.elements.filter(e=>e.id !== action.id)}
        default: return state;
    }
}

export const selectedElement = state => state.editor.selectedElement
export const elements = state => state.editor.elements