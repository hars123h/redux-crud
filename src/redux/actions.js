import * as types from './actionType'
import axios from 'axios';


const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users,
});
const usersDeleted = () => ({
    type: types.DELETE_USER
});

const userAdded = () => ({
    type: types.ADD_USER
});
const userUpdated = () => ({
    type: types.UPDATE_USER
});
const getSingleUser = (user) => ({
    type: types.GET_SINGLE_USER,
    payload: user
});
export const loadUser = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}`).then((resp) => {
            console.log("res", resp);
            dispatch(getUsers(resp.data))
        })
        .catch((err) =>  console.log(err))
    }
};

export const deleteUser = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_API}/${id}`)
        .then((resp) => {
            console.log("res", resp);
            dispatch(usersDeleted());
            dispatch(loadUser())
        })
        .catch((err) =>  console.log(err))
    }
};
export const addUser = (user) => {
    return function (dispatch) {
        axios
        .post(`${process.env.REACT_APP_API}`, user)
        .then((resp) => {
            console.log("res", resp);
            dispatch(userAdded());
            dispatch(loadUser())
        })
        .catch((err) =>  console.log(err))
    }
};

export const getUser = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}/${id}`)
        .then((resp) => {
            console.log("res", resp);
            dispatch(getSingleUser(resp.data));
        })
        .catch((err) =>  console.log(err))
    }
};

export const updateUser = (user, id) => {
    return function (dispatch) {
        axios.put(`${process.env.REACT_APP_API}/${id}`, user)
        .then((resp) => {
            console.log("res", resp);
            dispatch(userUpdated());
            dispatch(loadUser())
        })
        .catch((err) =>  console.log(err))
    }
};