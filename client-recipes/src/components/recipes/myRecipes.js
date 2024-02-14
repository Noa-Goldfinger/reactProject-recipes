import { useSelector } from "react-redux";
import FilterCategory from "../categories/filterCategories";

export default function MyRecipes() {
    const recipes = useSelector(state => state.recipes);
    const userId = useSelector(state => state.user?.Id);
    return<>
    <h1>המתכונים שלי:</h1>
    <div className="resipes">
    <FilterCategory recipes={recipes} userId={userId}/>
    </div>
    </>
}