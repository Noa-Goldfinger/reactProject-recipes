import { useState } from "react"
import SingleRecipe from "../recipes/singleRecipe"

export default function FilterCategory({categoryId,recipes,filterDuration,difficulty,userId}) {

   return<>
    {
        recipes.map((r, i) => (!categoryId || r.CategoryId == categoryId)
            &&
            (!filterDuration || r.Duration <= filterDuration)
            && (!difficulty|| r.Difficulty == difficulty)
            && (!userId || r.UserId == userId)
             ?
            <li key={r.id} >
                <SingleRecipe i={i}/>
            </li> : null)
    }
    </>
}