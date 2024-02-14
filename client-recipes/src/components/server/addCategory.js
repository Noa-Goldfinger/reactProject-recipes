import axios from "axios";
import * as Actions from "../store/action";

export default function addCategory(data) {

    return dispatch => {
        axios.post(`http://localhost:8080/api/category`,data)
        .then(res => {
            dispatch({ type: Actions.ADD_CATEGORY, payload: res.data })
        }
        ).catch(err => console.log(err));
    }
}