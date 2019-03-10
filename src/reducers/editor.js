const SET_SELECTED_ELEMENT = "SET_SELECTED_ELEMENT"
export const setSelectedElement = (id) => ({
    type: SET_SELECTED_ELEMENT,
    id
})

const ADD_ELEMENT = "ADD_ELEMENT"
export const addElement = (id, x, y, height, width) => ({
    type: ADD_ELEMENT,
    id, x, y, height, width
})

const REMOVE_ELEMENT = "REMOVE_ELEMENT"
export const removeElement = (id) => ({
    type: REMOVE_ELEMENT,
    id
})

const UPDATE_ELEMENT = "UPDATE_ELEMENT"
export const updateElement = (id, x, y, height, width) => ({
    type: UPDATE_ELEMENT,
    id, x, y, height, width
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
        case UPDATE_ELEMENT:
            return {...state, elements: state.elements.map(e=>{
                if(e.id === action.id)
                    return {...e, x: action.x, y: action.y, height: action.height, width: action.width}
                return e
            })}
        default: return state;
    }
}

export const selectedElement = state => state.editor.selectedElement
export const elements = state => state.editor.elements