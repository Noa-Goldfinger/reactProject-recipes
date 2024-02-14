import axios from "axios";
import * as Actions from "../store/action";

export default function SetCategories() {

    return dispatch => {
        axios.get(`http://localhost:8080/api/category`)
        .then(res => {
          dispatch({ type: Actions.SET_CATEGORY, payload: res.data })
        }
        ).catch(err => console.log(err));
    }
}