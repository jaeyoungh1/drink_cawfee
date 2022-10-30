import {csrfFetch} from './csrf'
const LOAD_ALL_COFFEE = 'coffee/load_all_coffee';
const GET_ONE_COFFEE = 'coffee/get_one_coffee';
const ADD_ONE_COFFEE = 'coffee/add_one_coffee';
const DELETE_ONE_COFFEE = 'coffee/delete_one_coffee';
const EDIT_ONE_COFFEE = 'coffee/edit_one_coffee';
// const CLEAR_DATA = '/coffee/CLEAR_DATA';


// Add a coffee
const _addOneCoffee = (coffee) => ({
    type: ADD_ONE_COFFEE,
    payload: coffee
});

export const addOneCoffee = (coffee) => async dispatch => {
    const response = await csrfFetch('/api/coffee/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
                },
        body: JSON.stringify(coffee)
    });
    console.log("RESPONSE AFTER CREATE BIZ THUNK", response)
    if (response.ok) {
        const data = await response.json()

        await dispatch(_addOneCoffee(data));
        return data;
    }
};

/********************************** READ **************************************/

// Get all coffees
const _loadAllCoffee = payload => ({
    type: LOAD_ALL_COFFEE,
    payload
});

// export const search = payload => ({
//     type: SEARCH,
//     payload
// });

export const loadAllCoffee = (searchParams) => async dispatch => {
    if (searchParams) {
        console.log(searchParams)
        // const response = await fetch(`/api/biz/?location=${location}`);
        // // console.log("hitting res", response)
        // if (response.ok) {
        //     const list = await response.json();
        //     // console.log("hitting list", list)
        //     dispatch(load(list));}
    }
    else {
        const response = await fetch('/api/coffee/');
        console.log("hitting res", response)
        if (response.ok) {
            const data = await response.json();
            console.log("hitting list", data)
            dispatch(_loadAllCoffee(data));
            return data
        }
    }
};


// Get user's coffee curations
export const loadUserCoffee = () => async dispatch => {
    const response = await fetch(`/api/coffee/current`);

    if (response.ok) {
        const data = await response.json();
        dispatch(_loadAllCoffee(data));

        return data;
    }
};

// Get a coffee' details
const _getOneCoffee = payload => ({
    type: GET_ONE_COFFEE,
    payload
});

export const getOneCoffee = id => async dispatch => {
    const response = await fetch(`/api/coffee/${id}`);

    if (response.ok) {
        const data = await response.json();

        dispatch(_getOneCoffee(data));
        return data;
    }
};


/********************************* UPDATE *************************************/

// Update a coffee
const _editOneCoffee = payload => ({
    type: EDIT_ONE_COFFEE,
    payload
});

export const editOneCoffee = (id, coffee) => async dispatch => {
    const response = await csrfFetch(`/api/coffee/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(coffee)
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(_editOneCoffee(data));

        return coffee;
    }
};


/********************************* DELETE *************************************/

// Delete a coffee

const _deleteOneCoffee = id => ({
    type: DELETE_ONE_COFFEE,
    id
});

export const deleteOneCoffee = id => async dispatch => {
    const response = await fetch(`/api/coffee/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const id = await response.json();
        dispatch(_deleteOneCoffee(id));
        return id;
    }
};


/* --------------------------- REDUCER: --------------------------- */

// export const clearData = () => ({
//     type: CLEAR_DATA
// });

// const LOAD_ALL_COFFEE = 'coffee/load_all_coffee';
// const GET_ONE_COFFEE = 'coffee/get_one_coffee';
// const ADD_ONE_COFFEE = 'coffee/add_one_coffee';
// const DELETE_ONE_COFFEE = 'coffee/delete_one_coffee';
// const EDIT_ONE_COFFEE = 'coffee/edit_one_coffee';


const initialState = { allCoffee: {}, singleCoffee: {} };


const coffeeReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALL_COFFEE:
            newState = { ...state, allCoffee: { ...state.allCoffee }, singleCoffee: { ...state.singleCoffee } };
            // console.log("LOAD_ALL ACTION.PAYLOAD IS:", action.payload);
            const newAllCoffee = {};
            action.payload.Coffees.forEach(coffee => newAllCoffee[coffee.id] = coffee);
            newState.allCoffee = newAllCoffee;
            // console.log("NEWSTATE AFTER LOAD_ALL ACTION:", newState);
            return newState;
        // case SEARCH:
        //     newState = { ...state, allCoffee: { ...state.allCoffee }, singlecoffee: { ...state.singlecoffee } };
        //     // console.log("LOAD_ALL ACTION.PAYLOAD IS:", action.payload);
        //     const newSearchCoffee = {};
        //     action.payload.forEach(coffee => newSearchCoffee[coffee.id] = coffee);
        //     newState.allCoffee = newSearchCoffee;
        //     // console.log("NEWSTATE AFTER LOAD_ALL ACTION:", newState);
        //     return newState;
        case GET_ONE_COFFEE:
            newState = { ...state, allCoffee: { ...state.allCoffee }, singleCoffee: { ...state.singleCoffee } };
            // console.log("LOAD_ONE ACTION.PAYLOAD IS:", action.payload);
            const newSingleCoffee = { ...action.payload };
            newState.singleCoffee = newSingleCoffee;
            // console.log("NEWSTATE AFTER LOAD_ONE ACTION:", newState);
            return newState;
        case ADD_ONE_COFFEE:
            newState = { ...state, allCoffee: { ...state.allCoffee }, singleCoffee: { ...state.singleCoffee } };
            const newCoffee = { ...action.payload };
            newState.singleCoffee[action.payload.id] = newCoffee;
            // console.log("NEWSTATE AFTER CREATE BIZ ACTION:", newState);
            return newState;
        case EDIT_ONE_COFFEE:
            newState = { ...state, allCoffee: { ...state.allCoffee }, singleCoffee: { ...state.singleCoffee } };
            const updatedCoffee = { ...action.payload };
            newState.allCoffee[action.payload.id] = updatedCoffee;
            // console.log("NEWSTATE AFTER ADD_coffee ACTION:", newState);
            return newState;
        case DELETE_ONE_COFFEE:
            newState = { ...state, allCoffee: { ...state.allCoffee }, singleCoffee: { ...state.singleCoffee } };
            delete newState.allCoffee[action.id];
            delete newState.singleCoffee[action.id];
            newState = { ...newState };
            console.log("NEWSTATE AFTER REMOVE_coffee ACTION:", newState);
            return newState;
        // case CLEAR_DATA:
        //     return initialState;
        default:
            return state;
    }
};

export default coffeeReducer;
