import { useFieldArray, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Input, Button } from "@mui/material";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import AddCategory from '../server/addCategory';
import EditRecipe from "../server/editRecipe"
import * as Actions from "../store/action";
import { useNavigate } from "react-router-dom";


const schema = yup
  .object({
    Name: yup.string().required(),
    CategoryId: yup.string().required(),
    Img: yup.string().url().required(),
    Duration: yup.number().required(),
    Difficulty: yup.number().required(),
    Description: yup.string().required(),
    Ingrident: yup.array().of(yup.object({
      Name: yup.string().required(),
      Count: yup.number().required(),
      Type: yup.string().required(),
    })).required(),
    Instructions: yup.array().of(yup.string().required()).required(),
  }).required()

export default function AddRecipe() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user?.Id);
  const categories = useSelector(state => state.categories);
  var recipeId = useSelector(state => state.recipeId);
  const [customCategory, setCustomCategory] = useState(false);
  const navigate=useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      UserId: user,
      Name: recipeId?.Name,
      CategoryId: recipeId?.CategoryId,
      Img: recipeId?.Img,
      Duration: recipeId?.Duration,
      Difficulty: recipeId?.Difficulty,
      Description: recipeId?.Description,
      Ingrident: recipeId?.Ingrident?.map((field) => ({
        Name: field.Name,
        Count: field.Count,
        Type: field.Type,
      })) || [],
      Instructions: recipeId?.Instructions || [],
    }
  })

  const onSubmit = (data) => {
    if (customCategory) {
      dispatch(AddCategory({ Name: data.CategoryId }))
      data.CategoryId = categories.length + 1;
    }
    if (!recipeId) {
      console.log(data);
      axios.post(`http://localhost:8080/api/recipe`, data)
        .then(res => {
          dispatch({ type: Actions.ADD_RECIPE, payload: res.data });
          console.log(res);
        })
        .catch(err => console.log(err.data));
    }
    else {
      data.Id = recipeId.Id;
      dispatch(EditRecipe(data,navigate));
      dispatch({ type: Actions.SET_RECIPE, payload: null });
      recipeId = null;
    }
    reset();
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    setCustomCategory(false);
  }

  const { fields: ingridentFields, append: appendIngrident } = useFieldArray({
    control,
    name: 'Ingrident',
  });

  const { fields: instructionFields, append: appendInstruction } = useFieldArray({
    control,
    name: 'Instructions',
  });

  return (
    <div className="AddCard">
    <form className="form-container"onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("Name")} placeholder='Name' />
      <p>{errors.Name?.message}</p>
      <label>Category</label>
      <select {...register("CategoryId")} onChange={(e) => setCustomCategory(e.target.value == categories.length)}>
        {categories.map((category, categoryId) =>
          <option key={categoryId} value={categoryId}>
            {category.Name}
          </option>
        )}
        <option key={categories.length} value={categories.length}>Other</option>
      </select>
      <br />
      {customCategory && (
        <input
          type="text"
          {...register("CategoryId")}
        />
      )}
      {errors.CategoryId && <p>{errors.CategoryId.message}</p>}
      <br />
      <Input {...register("Img")} placeholder='Img' />
      <p>{errors.Img?.message}</p>

      <Input {...register("Duration")} placeholder='Duration' />
      <p>{errors.Duration?.message}</p>

      <label>Difficulty</label>
      <select {...register("Difficulty")}>
          <option value={1}> {"Easy"}</option>
          <option value={2}> {"Medium"}</option>
          <option value={3}> {"Hard"}</option>
      </select>
      <br />
      <p>{errors.Difficulty?.message}</p>

      <Input {...register("Description")} placeholder='Description' />
      <p>{errors.Email?.message}</p>

      <label>Ingrident:</label>
      <div>
        {ingridentFields.map((field, index) => (
          <div key={field.id}>
            <Input {...register(`Ingrident.${index}.Name`)} placeholder='Name' />
            <Input {...register(`Ingrident.${index}.Count`)} placeholder='Count' />
            <Input {...register(`Ingrident.${index}.Type`)} placeholder='Type' />
            <br />
          </div>
        ))}
      </div>
      <Button
        variant="outlined"
        type="button"
        onClick={() => {
          appendIngrident({ Name: '', Count: '', Type: '' });
        }}
      >
        appendIngrident
      </Button>
      <br />
      <label>Instructions:</label>
      <div>
        {instructionFields.map((field, index) => (
          <div key={field.id}>
            <Input {...register(`Instructions.${index}`)} placeholder='Instruction' />
            <br />
          </div>
        ))}
      </div>
      <Button
        variant="outlined"
        type="button"
        onClick={() => {
          appendInstruction('');
        }}
      >
        appendInstructions
      </Button>
      <br />
      <Button variant="contained" type="submit">שליחה</Button>
    </form>
    </div>
  )
}