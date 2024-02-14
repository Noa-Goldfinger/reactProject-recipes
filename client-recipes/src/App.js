import './App.css';
import Header from './components/header';
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Signin from "./components/signin";
import HomePage from "./components/homePage";
import Entrance from "./components/entrance";
import Recipes from './components/recipes/recipes';
import MyRecipes from './components/recipes/myRecipes';
import AddRecipe from "./components/recipes/addRecipe"
import ShoppingList from "./components/shoppingList/shoppingList"

function App() {
  return (
    <div className="App">
      <div className='header'>
      <Header /></div>
      <Routes>
        <Route path="/" element={<Entrance />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/editRecipe" element={<AddRecipe />} />
        <Route path="/myRecipes" element={<MyRecipes />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/shoppingList" element={<ShoppingList />} />
      </Routes>
    </div>
  );
}

export default App;