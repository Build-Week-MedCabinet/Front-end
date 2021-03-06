import axios from "axios";
import { axiosWithAuth } from "../../Components/utils/AxiosWithAuth";

// action types
export const START_FETCHING = "START_FETCHING";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const REMOVE_STRAIN = "REMOVE_STRAIN";
export const ADD_STRAIN = "ADD_STRAIN";

// action creator0
export const dsData = () => dispatch => {
  dispatch({ type: START_FETCHING });

  axios
    .get("https://medcabinet.herokuapp.com/api/ds/sativa")
    .then(res => dispatch({ type: FETCH_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: FETCH_FAILURE, payload: err }));
};

export const fetchData = () => dispatch => {
  dispatch({ type: START_FETCHING });

  axiosWithAuth()
    .get(`https://medcabinet.herokuapp.com/strains/strains/user`)
    .then(res => dispatch({ type: FETCH_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: FETCH_FAILURE, payload: err }));
};

export const saveStrain = strain => dispatch => {
  dispatch({ type: START_FETCHING });

  axiosWithAuth()
    .post("https://medcabinet.herokuapp.com/strains/strain", strain)
    .then(res => dispatch({ type: ADD_STRAIN, payload: strain }))
    .catch(err => dispatch({ type: FETCH_FAILURE, payload: err }));
};

export const deleteStrain = strain => dispatch => {
  dispatch({ type: START_FETCHING });

  axiosWithAuth()
    .delete(`https://medcabinet.herokuapp.com/strains/strain`, {
      data: { strain: strain.strain }
    })
    .then(dispatch({ type: REMOVE_STRAIN, payload: strain }))
    .then(dispatch(fetchData()))
    .catch(err => dispatch({ type: FETCH_FAILURE, payload: err }));
};

export const removeStrain = strain => ({
  type: REMOVE_STRAIN,
  payload: strain
});

export const addStrain = strain => ({
  type: ADD_STRAIN,
  payload: strain
});
