import axios from "axios";
import * as Actions from "../store/action";

export default function AddIngident(data) {
    console.log(data);
    return dispatch => {
        axios.post("http://localhost:8080/api/bay",data)
        .then(res => {
            dispatch({ type: Actions.CHANGE_INGRIDENT, payload: res.data })
        }
        ).catch(err => console.log(err));
    }
}