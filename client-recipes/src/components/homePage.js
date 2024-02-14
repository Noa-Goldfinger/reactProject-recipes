import { useDispatch } from "react-redux";
import { useEffect } from "react";
import SetRecipe from "./server/setRecipes";
import SetCategories from "./server/setCategories";
import SetIngrident from "./server/setIngident";
import { useSelector } from "react-redux";
import Image from "../images/BANNER_HOMEPAGE_6_7.jpg"

export default function HomePage(){
  const dispatch = useDispatch();
  const userId= useSelector(state=>state.user?.Id);

  useEffect(() => {
    dispatch(SetRecipe());
    dispatch(SetCategories()); 
    dispatch(SetIngrident(userId));
  }, []);
  return<>
  <h1 className="Home">HomePage</h1>
  <img src={Image} alt="bunner"></img>
  </>  
}