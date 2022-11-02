import { useLocation, useParams } from 'react-router-dom';
import { csrfFetch } from './csrf'
const LOAD_ALL_CART = 'cart/load_all_cart';
const GET_ONE_CART = 'cart/get_one_cart';
const ADD_ONE_CART = 'cart/add_one_cart';
const DELETE_ONE_CART = 'cart/delete_one_cart';
const EDIT_ONE_CART = 'cart/edit_one_cart';
const SEARCH = 'cart/search_cart'
// const CLEAR_DATA = '/cart/CLEAR_DATA';


// Add cart item to the cart
const _addOneCart = (cart) => ({
    type: ADD_ONE_CART,
    payload: cart
});

export const addOneCart = (coffeeId, cart) => async dispatch => {
    const response = await csrfFetch(`/api/cart/${coffeeId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
    });
    if (response.ok) {
        const data = await response.json()

        await dispatch(_addOneCart(data));
        return data;
    }
};

/********************************** READ **************************************/

// Get all carts
const _loadAllCart = payload => ({
    type: LOAD_ALL_CART,
    payload
});

export const loadAllCart = () => async dispatch => {

    const response = await fetch('/api/cart/');
    // console.log("hitting res", response)
    if (response.ok) {
        const data = await response.json();
        // console.log("hitting all list", data)
        dispatch(_loadAllCart(data));
        return data

    }
};


/********************************* UPDATE *************************************/

// Update a cart item quantity
const _editOneCart = payload => ({
    type: EDIT_ONE_CART,
    payload
});

export const editOneCart = (cartId, cart) => async dispatch => {
    const response = await csrfFetch(`/api/cart/${cartId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(_editOneCart(data));

        return cart;
    }
};


/********************************* DELETE *************************************/

// Delete a cart

const _deleteOneCart = id => ({
    type: DELETE_ONE_CART,
    id
});

export const deleteOneCart = cartIdd => async dispatch => {
    const response = await fetch(`/api/cart/${cartIdd}`, {
        method: 'DELETE'
    });
    // console.log("RESPONSE AFTER DELETE THUNK", response)

    if (response.ok) {
        const id = await response.json();
        dispatch(_deleteOneCart(id));
        return id;
    }
};


/* --------------------------- REDUCER: --------------------------- */

const initialState = { allCart: {}, singleCart: {} };


const cartReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALL_CART:
            newState = { ...state, allCart: { ...state.allCart }, singleCart: { ...state.singleCart } };
            // console.log("LOAD_ALL ACTION.PAYLOAD IS:", action.payload);
            const newAllCart = {};
            action.payload.Carts.forEach(cart => newAllCart[cart.id] = cart);
            newState.allCart = newAllCart;
            // console.log("NEWSTATE AFTER LOAD_ALL ACTION:", newState);
            return newState;
        case GET_ONE_CART:
            newState = { ...state, allCart: { ...state.allCart }, singleCart: { ...state.singleCart } };
            // console.log("LOAD_ONE ACTION.PAYLOAD IS:", action.payload);
            const newSingleCart = { ...action.payload };
            newState.singleCart = newSingleCart;
            // console.log("NEWSTATE AFTER LOAD_ONE ACTION:", newState);
            return newState;
        case ADD_ONE_CART:
            newState = { ...state, allCart: { ...state.allCart }, singleCart: { ...state.singleCart } };
            const newCart = { ...action.payload };
            newState.singleCart[action.payload.id] = newCart;
            // console.log("NEWSTATE AFTER CREATE BIZ ACTION:", newState);
            return newState;
        case EDIT_ONE_CART:
            newState = { ...state, allCart: { ...state.allCart }, singleCart: { ...state.singleCart } };
            const updatedCart = { ...action.payload };
            newState.allCart[action.payload.id] = updatedCart;
            // console.log("NEWSTATE AFTER ADD_cart ACTION:", newState);
            return newState;
        case DELETE_ONE_CART:
            newState = { ...state, allCart: { ...state.allCart }, singleCart: { ...state.singleCart } };
            delete newState.allCart[action.id];
            delete newState.singleCart[action.id];
            newState = { ...newState };
            // console.log("NEWSTATE AFTER REMOVE_cart ACTION:", newState);
            return newState;
        default:
            return state;
    }
};

export default cartReducer;
