import './App.css';
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import * as React from 'react';
import {useEffect, useState} from 'react';
import UserMessage from "./Components/UserMessage";
import {v4 as uuidv4} from 'uuid';
import type {filterModel} from "./Models/Models";
import {recordModel} from "./Models/Models";
import {FormDialog} from "./Components/FormDialog";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HomeIcon from "@mui/icons-material/Home";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import PetsIcon from "@mui/icons-material/Pets";
import {LocalStorageHandler} from "./LocalStorageHandler/LocalStorageHandler";
import RecordsTable from "./Components/RecordsTable";
import RecordsFilter, {monthOptions} from "./Components/RecordsFilter";

//[{"id":"2162a9b5-7f88926-a874-b00037a971a4","title":"test","description":"test","category":"Furniture","price":"44","month":"Janurary","year":"2022"},{"id":"ae905478-9aad-4998-b36b-59345e571a26","title":"Coffee","description":"adsasd","category":"Food","price":"5","month":"March","year":"2023"},{"id":"d0f465c-6afe-4928-a353-70d630bb17aa","title":"Printer","description":"I need a printer for my officeI need a printer for my officeI need a printer for my officeI need a printer for my officeI need a printer for my officeI need a printer for my officeI need a printer for my officeI need a printer for my officeI need a printer for my officeI need a printer for my officeI need a printer for my officeI need a printer for my office","category":"Office Equipment","price":"2000","month":"Janurary","year":"2020"},{"id":"caf06bfb-d5d0-4557-97ed-32eb108a30dqqqq","title":"Friday Shopping","description":"We needed a lot of food","category":"Food","price":"1500","month":"August","year":"2022"},{"id":"54e225a-fd5c-40b2-8d23-7d8753b0eceb","title":"Optalgin","description":"I had a headache","category":"Health","price":"50","month":"April","year":"2022"},{"id":"2162a9b5-7f88-4726-a874-b00037a971a4","title":"test","description":"test","category":"Furniture","price":"44","month":"Janurary","year":"2023"},{"id":"ae90540e-9aad-4998-b36b-59345e571a26","title":"Coffee","description":"adsasd","category":"Food","price":"5","month":"December","year":"2022"},{"id":"d0f3bb5c-6afe-4928-a353-70d630bb17aa","title":"Printer","description":"I need a printer for my officeI need a printer for my officeI need a printer for my officeI need a printer for my officeI need a printer for my officeI need a printer for my officeI need a printer for my officeI need a printer for my officeI need a printer for my officeI need a printer for my officeI need a printer for my officeI need a printer for my office","category":"Office Equipment","price":"2000","month":"May","year":"2023"},{"id":"caf06bfb-d5d0-4557-97ed-32eb108a30d9","title":"Friday Shopping","description":"We needed a lot of food","category":"Food","price":"1500","month":"Janurary","year":"2022"},{"id":"54e5f85a-fd5c-40b2-8d23-7d8753b0eceb","title":"Optalgin","description":"I had a headache","category":"Health","price":"50","month":"Janurary","year":"2022"}]

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
    const [filter, setFilter] = useState({category: 'All', month: 'All', year: 'All'});
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

    const removeRecord = async function(id){
        try {
            let records = JSON.parse(localStorage.getItem('records')) ?? [];
            let objectToRemove = records.find(obj => obj.id === id);
            let index = records.indexOf(objectToRemove);
            if (index > -1)
                records.splice(index, 1);
            await LocalStorageHandler.setData(records);
            setRecords(records);
            showUserMessage(true, "success", "Record deleted successfully");
        }catch (e){
            showUserMessage(true, "An error occurred");
        }
    }

    const getDate = () => {
        const date = new Date();
        return {month: monthOptions[date.getMonth() + 1], year: date.getFullYear()};
    }

    const createRecord = async function (data) {
        let records = await LocalStorageHandler.getData();
        const dateObject = getDate();
        const newRecord: recordModel = {
            id: uuidv4(),
            title: data.recordTitle,
            description: data.recordDescription,
            category: data.recordCategory,
            price: data.recordPrice,
            month: dateObject.month,
            year: dateObject.year
        }
        records.push(newRecord);
        setRecords(records);
        await LocalStorageHandler.setData(records);

        showUserMessage(true, "success", "Record created successfully");
        setDialog(false);
    }

    const openCreateDialog = function(){
        setDialog(true);
    }

    const filterRecords = function(filter: filterModel){
        setFilter(filter)
    }

    return (
        <div className="App">
            <ResponsiveAppBar  openCreateDialog={openCreateDialog} />
            <RecordsFilter filterRecords={filterRecords}/>
            <RecordsTable data={records} filter={filter} removeRecord={removeRecord} />
            {/*<Grid container spacing={3} sx={{padding: '20px'}} justifyContent="center">*/}
            {/*    {records.map((record, index) => (*/}
            {/*        <Grid item key={index}>*/}
            {/*            <Record data={record} removeRecord={removeRecord} />*/}
            {/*        </Grid>*/}
            {/*    ))}*/}
            {/*</Grid>*/}
            <UserMessage handleClose={handleClose} message={message} />
            <FormDialog dialogState={dialog} handleDialog={()=>{setDialog(!dialog)}} createRecord={createRecord} />
        </div>
    );
}

export default App;