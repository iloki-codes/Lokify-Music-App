import { toast } from "react-toastify";
import axiosGet from "../axiosGet.js";
import * as actions from "./index.js";
import { act } from "react";

const apiUrl = process.env.API_URL;

export const getUser = async (payload, dispatch) => {
    dispatch(actions.getUserStart());
    try {
        const { data } = await axios.get(apiUrl + `${payload}`);
        dispatch(actions.getUserSuccess(data.data));
        return true;
    } catch (error) {
        dispatch(actions.getUserFailure());
        return false;
    }
};

export const updateUser = async (payload, dispatch) => {
    dispatch(actions.updateUserStart());
    try {
        const url = apiUrl + `/users/${payload.id}`;
        const { data } = await axiosGet.put(url, payload.data);

        dispatch(actions.updateUserSuccess(data.data));
        toast.success(data.message);
        return true;
    } catch (error) {
        dispatch(actions.getUserFailure());
        return false;
    }
};

export const likeSong = async (payload, dispatch) => {
    dispatch(actions.likeSongStart());
    try {
        const { data } = await axiosGet.put(apiUrl + `/songs/like/${payload}`);
        dispatch(actions.likeSongSuccess(payload));
        toast.success(data.message);
        return true;
    } catch (error) {
        dispatch(actions.likeSongFailure());
        return false; 
    }
}