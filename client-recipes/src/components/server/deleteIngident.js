import axios from "axios";
import * as Actions from "../store/action";

export default function DeleteIngident(data) {
    console.log(data);
    return dispatch => {
        axios.post(`http://localhost:8080/api/bay/delete/${data.Id}`,data)
        .then(res => {
            dispatch({ type: Actions.DELETE_INGRIDENT, payload: data})
        }
        ).catch(err => console.log(err));
    }
}