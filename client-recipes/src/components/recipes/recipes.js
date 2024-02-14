import {useState } from "react";
import { useSelector } from "react-redux"
import Category from "../categories/filters/category"
import FilterCategory from "../categories/filterCategories"
import LabeledValuesSlider from "../categories/filters/filterDuration"
import FilterDifficulty from "../categories/filters/filterDifficulty"

export default function GetRecipes() {
    const [categoryId, setCategoryId] = useState();
    const [filterDuration, setFilterDuration] = useState();
    const [difficulty, setDifficulty] = useState();
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const handleCategory = (data) => {
        setCategoryId(data);
    }
    const handleDurationCategory = (data) => {
        setFilterDuration(data);
    }
    const handleDifficulty = (data) => {
        setDifficulty(data);
    }

    const recipes = useSelector(state => state.recipes);

    return <>
        <h1>מתכונים:</h1>
        <div className="filters">
            <div>
        <div>Duration</div>
        <LabeledValuesSlider filterDuration={handleDurationCategory} /></div>
        <Category categoryId={handleCategory} />
        <FilterDifficulty difficulty={handleDifficulty} />
        </div>
    <div className="resipes">
        <FilterCategory categoryId={categoryId} recipes={recipes} filterDuration={filterDuration} difficulty={difficulty} />
        </div>
    </>
}