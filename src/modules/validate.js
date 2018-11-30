import axios from '../lib/axios'
import { actions as notifActions } from 'redux-notifications'


export const SET_INFOS = 'validate/SET_INFOS'

const initialState = {
  infos: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INFOS:
      return {
        ...state,
        infos: action.payload
      }
    default:
      return state
  }
}

export const getInfos = (barcode, fullname) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      let name = fullname ? fullname.split('(')[0] : null
      if(name) name = name.substr(0, name.length -1)
      const res = await axios.put(`/validate`, { barcode, name }, { headers: { 'X-Token': authToken } })
      if(res.status === 200) {
        dispatch({ type: SET_INFOS, payload: res.data })
      }
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: 'Une erreur est survenue',
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}