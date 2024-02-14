import { useDispatch, useSelector } from "react-redux";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import * as Actions from "../store/action";
import AddIngident from "../server/addIngident";
import { Print } from '@mui/icons-material';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function SingleRecipe({ i }) {
    const [expanded, setExpanded] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);
    const user = useSelector(state => state.user);

    const handleChange = (event, ingrident) => {
        var count = ingrident.Count;
        if (!event.target.checked) {
            count *= -1;
        }
        dispatch(AddIngident({ Name: ingrident.Name, Count: count, UserId: user.Id }));
    };
    
    const handlePrint = () => {
        var element = document.querySelector(`.selecton${i}`);
        console.log('Before adding class:', element);
        setExpanded(true);
        element.classList.add("section-to-print");
        
        console.log('After adding class:', element);
        setTimeout(()=>{
            window.print();
            console.log('After printing:', element);
            element.classList.remove("section-to-print");
            setExpanded(false);
        },200);
    };
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleEditClick = () => {
        dispatch({ type: Actions.SET_RECIPE, payload: recipes[i] });
        navigate("/recipe/editRecipe");
    };

    return (
        <div className={`selecton${i}`}>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {console.log(recipes[i].UserId)}
                            {recipes[i].UserId === user?.Id ? user?.Name : 'N'}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={recipes[i].Name}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={recipes[i].Img}
                    alt={`תמונה של ${recipes[i].name}`}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {recipes[i].Description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    {recipes[i]?.UserId === user?.Id ?
                        <IconButton aria-label="edit" onClick={handleEditClick}>
                            <EditIcon />
                        </IconButton> : ""}
                    <IconButton aria-label="print" onClick={handlePrint}>
                        <Print />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>מצרכים:</Typography>
                        <Typography paragraph>
                            {recipes[i].Ingrident.map((m, i) =>
                                <div className="recipeDetails" key={i}>
                                    <Checkbox onChange={(e) => handleChange(e, m)} inputProps={{ 'aria-label': 'controlled' }} /> {`${m?.Count} ${m?.Type !== '-' ? m?.Type : ''} ${m?.Name}`}
                                </div>
                            )}
                        </Typography>
                        <br />
                        <Typography paragraph>הוראות הכנה:</Typography>
                        <Typography paragraph>
                            <ul className="recipeDetails">{recipes[i].Instructions.map((r, i) =>
                                <li key={i}>{r}</li>
                            )}</ul>
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
            </div>
    );
}