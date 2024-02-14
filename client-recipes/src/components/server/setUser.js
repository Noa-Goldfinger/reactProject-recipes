import axios from "axios";
import * as Actions from "../store/action";

export default function Login1(data, navigate) {
    return dispatch => {
        axios.post(`http://localhost:8080/api/user/login`, data)
        .then(res => {
            navigate("/homePage")
            dispatch({ type: Actions.SET_USER, payload: res.data })
        }
        ).catch(err => navigate("/signin"));
    }
}
export function Sighin(data, navigate) {
    return dispatch => {
        axios.post(`http://localhost:8080/api/user/sighin`, data)
        .then(res => {
            navigate("/homePage")
            dispatch({ type: Actions.SET_USER, payload: res.data })
        })
        .catch(err => {
            console.log(err.response.data)
        })
    }
}
