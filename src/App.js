import './App.css';
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import * as React from 'react';
import {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Record from "./Components/Record";
import UserMessage from "./Components/UserMessage";
import {v4 as uuidv4} from 'uuid';
import {recordModel} from "./model/recordModel";
import {FormDialog} from "./Components/FormDialog";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HomeIcon from "@mui/icons-material/Home";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import PetsIcon from "@mui/icons-material/Pets";
import {LocalStorageHandler} from "./LocalStorageHandler/LocalStorageHandler";

export const categories = [
    {value: 'Food', label: 'Food'},
    {value: 'Furniture', label: 'Furniture'},
    {value: 'Fashion', label: 'Fashion'},
    {value: 'Health', label: 'Health'},
    {value: 'HouseHold', label: 'HouseHold'},
    {value: 'Office Equipment', label: 'Office Equipment'},
    {value: 'Pet Care', label: 'Pet Care'}
];

export const categoriesIcons = {
    'Food': <FastfoodIcon />,
    'Furniture':<ChairAltIcon />,
    'Fashion':<CheckroomIcon />,
    'Health':<LocalHospitalIcon />,
    'HouseHold':<HomeIcon />,
    'Office Equipment':<LocalPrintshopIcon />,
    'Pet Care':<PetsIcon />,
}

function App() {
    const [records, setRecords] = useState([]);
    const [message, setMessage] = React.useState({open:false, type:"success", text:""});
    const [dialog, setDialog] = useState(false);

    useEffect( () => {
        const loadData = async () => {
            let records = await LocalStorageHandler.getData();
            setRecords(records);
        };
        loadData();
    }, [])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        showUserMessage(false);
    };

    const showUserMessage = (open, type, text) => {
        setMessage({open:open, type: type ?? "success", text: text ?? ""});
    }

    const removeRecord = function(id){
        try {
            let records = JSON.parse(localStorage.getItem('records')) ?? [];
            let objectToRemove = records.find(obj => obj.id === id);
            let index = records.indexOf(objectToRemove);
            if (index > -1)
                records.splice(index, 1);
            localStorage.setItem('records', JSON.stringify(records));
            setRecords(records);
            showUserMessage(true, "success", "Record deleted successfully");
        }catch (e){
            showUserMessage(true, "An error occurred");
        }
    }

    const createRecord = function(data){
        let records = JSON.parse(localStorage.getItem('records')) ?? [];
        const newRecord: recordModel = {id:uuidv4(),title:data.recordTitle,description: data.recordDescription, type:data.recordCategory,price:data.recordPrice}
        records.push(newRecord);
        setRecords(records);
        localStorage.setItem('records', JSON.stringify(records));
        showUserMessage(true, "success", "Record created successfully");
        setDialog(false);
    }

    const openCreateDialog = function(){
        setDialog(true);
    }

    return (
        <div className="App">
            <ResponsiveAppBar  openCreateDialog={openCreateDialog} />
            <Grid container spacing={3} sx={{padding: '20px'}} justifyContent="center">
                {records.map((record, index) => (
                    <Grid item key={index}>
                        <Record data={record} removeRecord={removeRecord} />
                    </Grid>
                ))}
            </Grid>
            <UserMessage handleClose={handleClose} message={message} />
            <FormDialog dialogState={dialog} handleDialog={()=>{setDialog(!dialog)}} createRecord={createRecord} />
        </div>
    );
}

export default App;