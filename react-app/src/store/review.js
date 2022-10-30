import { csrfFetch } from './csrf'
const LOAD_ALL_REVIEW = 'review/load_all_review';
const GET_ONE_REVIEW = 'review/get_one_review';
const ADD_ONE_REVIEW = 'review/add_one_review';
const DELETE_ONE_REVIEW = 'review/delete_one_review';
const EDIT_ONE_REVIEW = 'review/edit_one_review';
// const CLEAR_DATA = '/review/CLEAR_DATA';


const _addOneReview = (review) => ({
    type: ADD_ONE_REVIEW,
    payload: review
});

export const addOneReview = (coffeeId, review) => async dispatch => {
    const response = await csrfFetch(`/api/coffee/${coffeeId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });
    // console.log("RESPONSE AFTER CREATE BIZ THUNK", response)
    if (response.ok) {
        const data = await response.json()
        await dispatch(_addOneReview(data));
        return data;
    }
};

/********************************** READ **************************************/

// Get all reviews for one coffee
const _loadAllReview = payload => ({
    type: LOAD_ALL_REVIEW,
    payload
});

// export const search = payload => ({
//     type: SEARCH,
//     payload
// });

export const loadAllReview = (id) => async dispatch => {
   
        const response = await fetch(`/api/coffee/${id}/reviews`);
        // console.log("hitting res", response)
        if (response.ok) {
            const data = await response.json();
            // console.log("hitting list", data)
            dispatch(_loadAllReview(data));
            return data
    }
};


// Get user's review curations
export const loadUserReview = () => async dispatch => {
    const response = await fetch(`/api/review/current`);

    if (response.ok) {
        const data = await response.json();
        dispatch(_loadAllReview(data));

        return data;
    }
};

// Get a review' details <<<<<<<<<<<<<<<<< TEST!!!!
const _getOneReview = payload => ({
    type: GET_ONE_REVIEW,
    payload
});

export const getOneReview = id => async dispatch => {
    const response = await fetch(`/api/review/${id}`);

    if (response.ok) {
        const data = await response.json();

        dispatch(_getOneReview(data));
        return data;
    }
};


/********************************* UPDATE *************************************/

// Update a review
const _editOneReview = payload => ({
    type: EDIT_ONE_REVIEW,
    payload
});

export const editOneReview = (id, review) => async dispatch => {
    const response = await csrfFetch(`/api/review/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(_editOneReview(data));

        return review;
    }
};


/********************************* DELETE *************************************/

// Delete a review

const _deleteOneReview = id => ({
    type: DELETE_ONE_REVIEW,
    id
});

export const deleteOneReview = id => async dispatch => {
    const response = await fetch(`/api/review/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const id = await response.json();
        dispatch(_deleteOneReview(id));
        return id;
    }
};


/* --------------------------- REDUCER: --------------------------- */

const initialState = { allReview: {}, singleReview: {} };


const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALL_REVIEW:
            newState = { ...state, allReview: { ...state.allReview }, singleReview: { ...state.singleReview } };
            // console.log("LOAD_ALL ACTION.PAYLOAD IS:", action.payload);
            const newAllReview = {};
            action.payload.Reviews.forEach(review => newAllReview[review.id] = review);
            newState.allReview = newAllReview;
            // console.log("NEWSTATE AFTER LOAD_ALL ACTION:", newState);
            return newState;
        case GET_ONE_REVIEW:
            newState = { ...state, allReview: { ...state.allReview }, singleReview: { ...state.singleReview } };
            // console.log("LOAD_ONE ACTION.PAYLOAD IS:", action.payload);
            const newSingleReview = { ...action.payload };
            newState.singleReview = newSingleReview;
            // console.log("NEWSTATE AFTER LOAD_ONE ACTION:", newState);
            return newState;
        case ADD_ONE_REVIEW:
            newState = { ...state, allReview: { ...state.allReview }, singleReview: { ...state.singleReview } };
            const newReview = { ...action.payload };
            newState.singleReview[action.payload.id] = newReview;
            // console.log("NEWSTATE AFTER CREATE BIZ ACTION:", newState);
            return newState;
        case EDIT_ONE_REVIEW:
            newState = { ...state, allReview: { ...state.allReview }, singleReview: { ...state.singleReview } };
            const updatedReview = { ...action.payload };
            newState.allReview[action.payload.id] = updatedReview;
            // console.log("NEWSTATE AFTER ADD_review ACTION:", newState);
            return newState;
        case DELETE_ONE_REVIEW:
            newState = { ...state, allReview: { ...state.allReview }, singleReview: { ...state.singleReview } };
            delete newState.allReview[action.id];
            delete newState.singleReview[action.id];
            newState = { ...newState };
            console.log("NEWSTATE AFTER REMOVE_review ACTION:", newState);
            return newState;
        // case CLEAR_DATA:
        //     return initialState;
        default:
            return state;
    }
};

export default reviewReducer;
