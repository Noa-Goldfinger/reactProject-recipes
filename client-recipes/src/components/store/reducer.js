import * as Actions from './action'

const initialState = {
    recipes: [],
    shoppingList: [],
    categories: [],
    recipeId: null,
    user: null,
}

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case Actions.SET_USER: {
            return { ...state, user: action.payload }
        }
        case Actions.SET_RECIPES:
            return { ...state, recipes: action.payload }
        case Actions.ADD_RECIPE: {
            const recipes = [...state.recipes];
            recipes.push(action.payload);
            return { ...state, recipes }
        }
        case Actions.SET_RECIPE: {
            return { ...state, recipeId: action.payload }
        }
        case Actions.EDIT_RECIPE: {
            const recipes = [...state.recipes];
            const findIndex = recipes.findIndex(x => x.Id === action.payload.Id);
            recipes[findIndex] = action.payload;
            return { ...state, recipes }
        }
        case Actions.DELETE_RECIPE: {
            const recipes = state.recipes.filter(x => x.Id !== action.payload);
            return { ...state, recipes }
        }
        case Actions.SET_INGRIDENT: {
            return { ...state, shoppingList: action.payload }
        }
        case Actions.CHANGE_INGRIDENT: {
            const shoppingList = [...state.shoppingList];
            const index = shoppingList.findIndex(g => g.Name === action.payload.Name);
            if (index >= 0)
                shoppingList[index] = action.payload;
            else shoppingList.push(action.payload)                  
            return { ...state, shoppingList }
        }
        case Actions.DELETE_INGRIDENT:
            {
                var shoppingList = [...state.shoppingList];
                shoppingList = shoppingList.filter(g => g.Id !== action.payload.Id);
                return {...state,shoppingList}
            }
        case Actions.SET_CATEGORY: {
            return { ...state, categories: action.payload }
        }
        case Actions.ADD_CATEGORY: {
            const categories=[...state.categories];
            categories.push(action.payload);
            return { ...state, categories}
        }
        default: return { ...state }
    }
}