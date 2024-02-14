import { useSelector } from "react-redux";
import { useEffect } from "react";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import LinkTab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {

    const navigate = useNavigate();
    const { pathname } = useLocation()

    const [value, setValue] = React.useState(0);
    const nav = ["login", "signin"];
    const nav2 = ["homePage","myRecipes","recipes","shoppingList","addRecipe","" ];
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(event.target.name)
    };
    useEffect(() => {
        const parts = pathname.split('/');
        const lastPart = parts[parts.length - 1];
        console.log(lastPart)
        console.log(value)
        if (lastPart === "login" || lastPart === "signin") {
            const findIndex = nav.findIndex(x => x === lastPart);
            setValue(findIndex)
        }
        else{
            const findIndex = nav2.findIndex(x => x === lastPart);
            setValue(findIndex) 
        }
    }, [pathname]);

    const userId = useSelector(state => state.user?.Id);

    return <>
        {!userId ? <>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                    role="navigation"
                >
                    <LinkTab label="כניסה" name={"/login"} />
                    <LinkTab label="הרשמה" name={"/signin"} />
                </Tabs>
            </Box></> : <>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                    role="navigation"
                >
                    <LinkTab label="דף בית" name={"/homePage"} />
                    <LinkTab label="המתכונים שלי" name={"/myRecipes"} />
                    <LinkTab label="מתכונים" name={"/recipes"} />
                    <LinkTab label="רשימת קניות" name={"/shoppingList"}/>
                    <LinkTab label="הוספת מתכון" name={"/addRecipe"}/>
                    {/* <LinkTab label="הוספת קטגוריה" name={"/category"}/> */}
                    <LinkTab label="התנתקות" name={"/"} />
                </Tabs>
            </Box></>}
    </>
}