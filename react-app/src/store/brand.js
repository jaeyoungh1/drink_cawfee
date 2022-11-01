import { csrfFetch } from './csrf'
const LOAD_ALL_BRAND = 'brand/load_all_brand';
const GET_ONE_BRAND = 'brand/get_one_brand';
const ADD_ONE_BRAND = 'brand/add_one_brand';
const DELETE_ONE_BRAND = 'brand/delete_one_brand';
const EDIT_ONE_BRAND = 'brand/edit_one_brand';
// const CLEAR_DATA = '/brand/CLEAR_DATA';


const _addOneBrand = (brand) => ({
    type: ADD_ONE_BRAND,
    payload: brand
});

export const addOneBrand = (coffeeId, brand) => async dispatch => {
    const response = await csrfFetch(`/api/coffee/${coffeeId}/brands`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(brand)
    });
    // console.log("RESPONSE AFTER CREATE BIZ THUNK", response)
    if (response.ok) {
        const data = await response.json()
        await dispatch(_addOneBrand(data));
        return data;
    }
};

/********************************** READ **************************************/

// Get all brands for one coffee
const _loadAllBrand = payload => ({
    type: LOAD_ALL_BRAND,
    payload
});

// export const search = payload => ({
//     type: SEARCH,
//     payload
// });

export const loadAllBrand = () => async dispatch => {

    const response = await fetch(`/api/brand/`);
    // console.log("hitting res", response)
    if (response.ok) {
        const data = await response.json();
        // console.log("hitting list", data)
        dispatch(_loadAllBrand(data));
        return data
    }
};


// Get user's brand curations
export const loadUserBrand = () => async dispatch => {
    const response = await fetch(`/api/brand/current`);

    if (response.ok) {
        const data = await response.json();
        dispatch(_loadAllBrand(data));

        return data;
    }
};

// Get a brand' details <<<<<<<<<<<<<<<<< TEST!!!!
const _getOneBrand = payload => ({
    type: GET_ONE_BRAND,
    payload
});

export const getOneBrand = id => async dispatch => {
    const response = await fetch(`/api/brand/${id}`);

    if (response.ok) {
        const data = await response.json();

        dispatch(_getOneBrand(data));
        return data;
    }
};


/********************************* UPDATE *************************************/

// Update a brand
const _editOneBrand = payload => ({
    type: EDIT_ONE_BRAND,
    payload
});

export const editOneBrand = (id, brand) => async dispatch => {
    const response = await csrfFetch(`/api/brand/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(brand)
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(_editOneBrand(data));

        return brand;
    }
};


/********************************* DELETE *************************************/

// Delete a brand

const _deleteOneBrand = id => ({
    type: DELETE_ONE_BRAND,
    id
});

export const deleteOneBrand = id => async dispatch => {
    const response = await fetch(`/api/brand/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const id = await response.json();
        dispatch(_deleteOneBrand(id));
        return id;
    }
};


/* --------------------------- REDUCER: --------------------------- */

const initialState = { allBrand: {}, singleBrand: {} };


const brandReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALL_BRAND:
            newState = { ...state, allBrand: { ...state.allBrand }, singleBrand: { ...state.singleBrand } };
            // console.log("LOAD_ALL ACTION.PAYLOAD IS:", action.payload);
            const newAllBrand = {};
            action.payload.Brands.forEach(brand => newAllBrand[brand.id] = brand);
            newState.allBrand = newAllBrand;
            // console.log("NEWSTATE AFTER LOAD_ALL ACTION:", newState);
            return newState;
        case GET_ONE_BRAND:
            newState = { ...state, allBrand: { ...state.allBrand }, singleBrand: { ...state.singleBrand } };
            // console.log("LOAD_ONE ACTION.PAYLOAD IS:", action.payload);
            const newSingleBrand = { ...action.payload };
            newState.singleBrand = newSingleBrand;
            // console.log("NEWSTATE AFTER LOAD_ONE ACTION:", newState);
            return newState;
        case ADD_ONE_BRAND:
            newState = { ...state, allBrand: { ...state.allBrand }, singleBrand: { ...state.singleBrand } };
            const newBrand = { ...action.payload };
            newState.singleBrand[action.payload.id] = newBrand;
            // console.log("NEWSTATE AFTER CREATE BIZ ACTION:", newState);
            return newState;
        case EDIT_ONE_BRAND:
            newState = { ...state, allBrand: { ...state.allBrand }, singleBrand: { ...state.singleBrand } };
            const updatedBrand = { ...action.payload };
            newState.allBrand[action.payload.id] = updatedBrand;
            // console.log("NEWSTATE AFTER ADD_brand ACTION:", newState);
            return newState;
        case DELETE_ONE_BRAND:
            newState = { ...state, allBrand: { ...state.allBrand }, singleBrand: { ...state.singleBrand } };
            delete newState.allBrand[action.id];
            delete newState.singleBrand[action.id];
            newState = { ...newState };
            return newState;
        default:
            return state;
    }
};

export default brandReducer;
