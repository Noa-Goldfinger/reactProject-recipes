import { useDispatch } from "react-redux";
import * as Actions from './store/action'
import { useNavigate } from "react-router-dom";
import Image1 from "../images/BANNER_HOMEPAGE_6_7.jpg";

export default function Entrance(){
  const dispatch = useDispatch();
  dispatch({ type: Actions.SET_USER, payload: null })
  const navigate = useNavigate();
  navigate("/")
  
    return<>
    <h2>מתכונים שיעניקו לך חוויה טעימה ומהנה, יובילו אותך לעולם של טעמים ייחודיים ובלתי נשכחים.</h2>
  <img src={Image1} alt="bunner"></img>

    </>  
  }