import { useLocation, useParams } from 'react-router-dom';
import { csrfFetch } from './csrf'
const LOAD_ALL_ORDER = 'order/load_all_order';
const GET_ONE_ORDER = 'order/get_one_order';
const ADD_ONE_ORDER = 'order/add_one_order';
const DELETE_ONE_ORDER = 'order/delete_one_order';
const EDIT_ONE_ORDER = 'order/edit_one_order';
// const CLEAR_DATA = '/order/CLEAR_DATA';


// Add order item to the order
const _addOneOrder = (order) => ({
    type: ADD_ONE_ORDER,
    payload: order
});

export const addOneOrder = (cartId, order_number, total) => async dispatch => {
    // console.log("INSIDE STORE ADDING ORDER", typeof (cartId), cartId, typeof (order_number), order_number)
    const response = await csrfFetch(`/api/order/${cartId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({order_number, total})
    });
    console.log("RESPONSE", response)
    if (response.ok) {
        const data = await response.json()

        await dispatch(_addOneOrder(data));
        return data;
    }
};

/********************************** READ **************************************/

// Get all orders
const _loadAllOrder = payload => ({
    type: LOAD_ALL_ORDER,
    payload
});

export const loadAllOrder = () => async dispatch => {

    const response = await fetch('/api/order/');
    // console.log("hitting res", response)
    if (response.ok) {
        const data = await response.json();
        // console.log("hitting all list", data)
        dispatch(_loadAllOrder(data));
        return data

    }
};


/********************************* UPDATE *************************************/

// Update a order item quantity
const _editOneOrder = payload => ({
    type: EDIT_ONE_ORDER,
    payload
});

export const editOneOrder = (orderId, order) => async dispatch => {
    console.log("EDITING ORDER", orderId, order)
    const response = await csrfFetch(`/api/order/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(_editOneOrder(data));

        return order;
    }
};


/********************************* DELETE *************************************/

// Delete a order

const _deleteOneOrder = id => ({
    type: DELETE_ONE_ORDER,
    id
});

export const deleteOneOrder = orderId => async dispatch => {
    const response = await fetch(`/api/order/${orderId}`, {
        method: 'DELETE'
    });
    // console.log("RESPONSE AFTER DELETE THUNK", response)

    if (response.ok) {
        const id = await response.json();
        dispatch(_deleteOneOrder(id));
        return id;
    }
};


/* --------------------------- REDUCER: --------------------------- */

const initialState = { allOrder: {}, singleOrder: {} };


const orderReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALL_ORDER:
            newState = { ...state, allOrder: { ...state.allOrder }, singleOrder: { ...state.singleOrder } };
            // console.log("LOAD_ALL ACTION.PAYLOAD IS:", action.payload);
            const newAllOrder = {};
            action.payload.Order.forEach(order => newAllOrder[order.id] = order);
            newState.allOrder = newAllOrder;
            // console.log("NEWSTATE AFTER LOAD_ALL ACTION:", newState);
            return newState;
        case ADD_ONE_ORDER:
            newState = { ...state, allOrder: { ...state.allOrder }, singleOrder: { ...state.singleOrder } };
            const newOrder = { ...action.payload };
            newState.singleOrder[action.payload.id] = newOrder;
            // console.log("NEWSTATE AFTER CREATE BIZ ACTION:", newState);
            return newState;
        case EDIT_ONE_ORDER:
            newState = { ...state, allOrder: { ...state.allOrder }, singleOrder: { ...state.singleOrder } };
            const updatedOrder = { ...action.payload };
            newState.allOrder[action.payload.id] = updatedOrder;
            // console.log("NEWSTATE AFTER ADD_order ACTION:", newState);
            return newState;
        case DELETE_ONE_ORDER:
            newState = { ...state, allOrder: { ...state.allOrder }, singleOrder: { ...state.singleOrder } };
            delete newState.allOrder[action.id];
            delete newState.singleOrder[action.id];
            newState = { ...newState };
            // console.log("NEWSTATE AFTER REMOVE_order ACTION:", newState);
            return newState;
        default:
            return state;
    }
};

export default orderReducer;
