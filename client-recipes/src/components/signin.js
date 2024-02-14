import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Input, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Sighin } from "./server/setUser";


const schema = yup
  .object({
    Username: yup.string().required(),
    Password: yup.string().matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
      '  הסיסמה צריכה לכלול לפחות אות קטנה, אות גדולה, מספר לפחות 4 תוים '
    ).min(4),
    Name: yup.string().required(),
    Phone: yup.string().matches(/^\d{9,10}$/, 'המספר אינו תקין').required(),
    Email: yup.string().email().required(),
    Tz: yup.string().matches(/^\d{9}$/, 'הת"ז אינה תקינה').required(),
  }).required()

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })


  const onSubmit = (data) => {
    console.log(data);
    dispatch(Sighin(data, navigate));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("Username")} placeholder='User name' />
      <p>{errors.Username?.message}</p>

      <Input
        {...register("Password")}
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        label="Password"
        value={password}
        onChange={handleChangePassword}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePasswordVisibility}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <p>{errors.Password?.message}</p>

      <Input {...register("Name")} placeholder='Name' />
      <p>{errors.Name?.message}</p>

      <Input {...register("Phone")} placeholder='Phone' />
      <p>{errors.Phone?.message}</p>

      <Input {...register("Email")} placeholder='Email' />
      <p>{errors.Email?.message}</p>

      <Input {...register("Tz")} placeholder='Tz' />
      <p>{errors.Tz?.message}</p>

      <Button variant="outlined" type="submit">שליחה</Button>
    </form>
  )
}