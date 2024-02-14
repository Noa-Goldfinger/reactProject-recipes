import axios from "axios";
import * as Actions from "../store/action";

export default function SetIngrident(userId) {
  return dispatch => {
        axios.get(`http://localhost:8080/api/bay/${userId}`)
        .then(res => {
          dispatch({ type: Actions.SET_INGRIDENT, payload: res.data });
        }
        ).catch(err => console.log(err));
    }
}