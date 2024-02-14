import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Input, Button } from "@mui/material";
import * as yup from "yup"
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Login1 from "./server/setUser";

const schema = yup
    .object({
        Username: yup.string().required(),
        Password: yup.string().required(),
    }).required()

export default function Login() {
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
        dispatch(Login1(data, navigate));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("Username")} placeholder='Name' label="Name" />
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

            <Button variant="outlined" type="submit">שליחה</Button>
        </form>
    )
}
