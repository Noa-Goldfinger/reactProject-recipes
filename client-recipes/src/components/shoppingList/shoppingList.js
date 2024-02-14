import React from 'react'
import { useSelector } from 'react-redux'
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import 'semantic-ui-css/semantic.min.css'
import { useDispatch } from 'react-redux';
import AddIngident from '../server/addIngident';
import DeleteIngident from '../server/deleteIngident';
import IconButton from '@mui/material/IconButton';

import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Table,
} from 'semantic-ui-react'

export default function ShoppingList() {
    const shoppingList = useSelector(state => state.shoppingList);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    function removeIngident(name, id, count) {
        if (count - 1 <= 0) {
            dispatch(DeleteIngident({ Id: id, UserId: user.Id }))
        }
        else
            dispatch(AddIngident({ Name: name, Count: -1, UserId: user.Id }))
    }

    return <>
    <h1>רשימת קניות</h1>
        <div className='shoppingList'>
            <Table celled fixed singleLine>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Count</TableHeaderCell>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {shoppingList?.map((ingrident, index) =>
                        <TableRow>
                            <TableCell>{ingrident.Count}</TableCell>
                            <TableCell>{ingrident.Name}</TableCell>
                            <TableCell>
                                <IconButton  onClick={() => dispatch(AddIngident({ Name: ingrident.Name, Count: 1, UserId: user.Id }))}>
                                    <AddIcon /> </IconButton>
                                <IconButton  onClick={() => removeIngident(ingrident.Name, ingrident.Id, ingrident.Count)}>
                                    <RemoveIcon /></IconButton>
                                <IconButton  onClick={() => dispatch(DeleteIngident({ Id: ingrident.Id, UserId: user.Id }))}>
                                    <CheckIcon />Bought</IconButton>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    </>
}
