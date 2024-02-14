import axios from "axios";
import * as Actions from "../store/action";

export default function SetRecipe() {

    return dispatch => {
        axios.get(`http://localhost:8080/api/recipe`)
        .then(res => {
            dispatch({ type: Actions.SET_RECIPES, payload: res.data })
        }
        ).catch(err => console.log(err));
    }
}