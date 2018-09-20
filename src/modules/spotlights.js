import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { fetchUser } from './user';
import { actions as notifActions } from 'redux-notifications'
import { push } from 'react-router-redux'

export const SET_SPOTLIGHTS = 'spotlights/SET_SPOTLIGHTS'

const initialState = {
  spotlights: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTLIGHTS:
      return {
        spotlights: action.payload
      }
    default:
      return state
  }
}

export const fetchSpotlights = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    const oldSpotlights = getState().spotlights
    console.log('oldSpotlights', oldSpotlights)

    if (!authToken || authToken.length === 0) {
      return
    }

    const spotlights = await axios.get('spotlights', { headers: { 'X-Token': authToken } })
    if(oldSpotlights.length !== spotlights.length){
      dispatch({
        type: SET_SPOTLIGHTS,
        payload: spotlights.data
      })
    }
  }
}

