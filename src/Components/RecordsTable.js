/*
Developers:
Oren Zehavi ID: 315940429
Matan Maimon ID: 207275959
*/
import * as React from 'react';
import {FC} from 'react';
import '../App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Chip from "@mui/material/Chip";
import Badge from '@mui/material/Badge';
import type {filterModel, recordModel} from "../Models/Models";
import {manager} from "../App";

const Record : FC<{data: recordModel[], filter: filterModel, removeRecord:void}> = ({data, filter, removeRecord}) => {

    const filteredData = () => {
        if(filter.category && filter.category !== 'All')
            data = data.filter(item => item.category === filter.category);
        if(filter.month && filter.month !== 'All')
            data = data.filter(item => item.month === filter.month);
        if(filter.year && filter.year !== 'All')
            data = data.filter(item => item.year === filter.year);
        return data;
    }

    data = filteredData();
    const total = data.reduce((accumulator, object) => {return  accumulator + parseInt(object.price)}, 0);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'><h3><Badge badgeContent={data.length} color='success' showZero max={1000000}>#</Badge></h3></TableCell>
                        <TableCell align='center'><h3>Title</h3></TableCell>
                        <TableCell align='center'><h3>Description</h3></TableCell>
                        <TableCell align='center'><h3>Price (<span style={{color: 'green'}}>{total}₪</span> Total)</h3></TableCell>
                        <TableCell align='center'><h3>Type</h3></TableCell>
                        <TableCell align='center'><h3>Date</h3></TableCell>
                        <TableCell align='center'></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((record, idx) => (
                        <TableRow key={record.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align='center'>{idx + 1}</TableCell>
                            <TableCell component="th" scope="row" align='center'>{record.title}</TableCell>
                            <TableCell align='center' style={{maxWidth:'250px'}}>{record.description}</TableCell>
                            <TableCell align='center' className={'priceText'}>{record.price}₪</TableCell>
                            <TableCell align='center'><Chip label={record.category} variant='outlined' icon={manager.categoriesIcons[record.category]}/></TableCell>
                            <TableCell align='center'>{record.month}/{record.year}</TableCell>
                            <TableCell align='center'>
                                <IconButton aria-label='delete' size="'large" onClick={() =>{removeRecord(record.id)}}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Record;