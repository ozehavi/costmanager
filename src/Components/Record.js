import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {recordModel} from "../model/recordModel";
import {FC} from "react";

const Record : FC<{data: recordModel, removeRecord:void}> = ({data, removeRecord}) => {
    return (
        <Card sx={{ minWidth: 275, backgroundColor: '#e7e8e6' }} >
            <CardContent>
                <Typography variant="h5" component="div">
                    {data?.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {data?.description}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {data?.price}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {data?.type}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="delete" size="large" onClick={() =>{removeRecord(data.id)}}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default Record;