import axios from "axios";
import * as Actions from "../store/action";

export default function EditRecipe(data,navigate) {
    console.log(data);

    return dispatch => {
        axios.post(`http://localhost:8080/api/recipe/edit`,data)
        .then(res => {
            dispatch({ type: Actions.EDIT_RECIPE, payload: res.data })
            navigate("/recipes");
        }
        ).catch(err => console.log(err.data));
    }
}