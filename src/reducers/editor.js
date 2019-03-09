const SET_SELECTED_ELEMENT = "SET_SELECTED_ELEMENT"
export const setSelectedElement = (id) => ({
    type: SET_SELECTED_ELEMENT,
    id
})

const ADD_ELEMENT = "ADD_ELEMENT"
export const addElement = (id, x, y) => ({
    type: ADD_ELEMENT,
    id, x, y
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
        case ADD_ELEMENT:
            return {...state,
                elements: [...state.elements, {id: action.id, x: action.x, y: action.y}],
                setSelectedElement: action.id
            }
        case REMOVE_ELEMENT: return {...state, elements: state.elements.filter(e=>e.id !== action.id)}
        default: return state;
    }
}

export const selectedElement = state => state.editor.selectedElement
export const elements = state => state.editor.elements