import './App.css';
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import * as React from 'react';
import {useEffect, useState} from 'react';
import UserMessage from "./Components/UserMessage";
import {v4 as uuidv4} from 'uuid';
import {filterModel, recordModel} from "./Models/Models";
import {FormDialog} from "./Components/FormDialog";
import {LocalStorageHandler} from "./LocalStorageHandler/LocalStorageHandler";
import RecordsTable from "./Components/RecordsTable";
import RecordsFilter from "./Components/RecordsFilter";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HomeIcon from "@mui/icons-material/Home";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import PetsIcon from "@mui/icons-material/Pets";

export const manager = {};
manager.categoriesOptions = ['All', 'Food', 'Furniture', 'Fashion', 'Health', 'HouseHold', 'Office Equipment', 'Pet Care'];
manager.monthOptions = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
manager.yearOptions = ['All', '2020', '2021', '2022', '2023', '2024'];
manager.categoriesIcons = {
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
    const [filter, setFilter] = useState(new filterModel('All', 'All', 'All'));
    const [message, setMessage] = React.useState({open:false, type:"success", text:""});
    const [dialog, setDialog] = useState(false);

    useEffect( () => {
        const loadData = async () => {
            LocalStorageHandler.getData().then(records =>{
                setRecords(records);
            }).catch(e => showUserMessage(true, 'error', e))
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
        setMessage({open:open, type: type ?? 'success', text: text ?? ''});
    }

    const removeRecord = async function(id){
        try {
            LocalStorageHandler.getData().then(records =>{
                let objectToRemove = records.find(obj => obj.id === id);
                let index = records.indexOf(objectToRemove);
                if (index > -1)
                    records.splice(index, 1);
                LocalStorageHandler.setData(records).then(() =>{
                    setRecords(records);
                    showUserMessage(true, 'success', 'Record deleted successfully');
                }).catch(e => showUserMessage(true, 'error', e))
            }).catch(e => showUserMessage(true, 'error', e))
        }catch (e){
            showUserMessage(true, 'error','An error occurred');
        }
    }

    const getDate = () => {
        const date = new Date();
        return {month: manager.monthOptions[date.getMonth() + 1], year: date.getFullYear()};
    }

    const createRecord = async function (data) {
        LocalStorageHandler.getData().then(records => {
            const dateObject = getDate();
            const newRecord = new recordModel(
                uuidv4(),
                data.recordTitle,
                data.recordDescription,
                data.recordCategory,
                data.recordPrice,
                dateObject.month,
                dateObject.year
            );
            records.push(newRecord);
            setRecords(records);

            LocalStorageHandler.setData(records).then(() =>{
                showUserMessage(true, 'success', 'Record created successfully');
            }).catch(e => showUserMessage(true, 'error', e))
        })
        .catch(e => showUserMessage(true, 'error', e))
        .finally(setDialog(false));
    }

    const openCreateDialog = function(){
        setDialog(true);
    }

    const filterRecords = function(filter: filterModel){
        setFilter(filter)
    }

    return (
        <div className='App'>
            <ResponsiveAppBar  openCreateDialog={openCreateDialog} />
            <RecordsFilter filterRecords={filterRecords}/>
            <RecordsTable data={records} filter={filter} removeRecord={removeRecord} />
            <UserMessage handleClose={handleClose} message={message} />
            <FormDialog dialogState={dialog} handleDialog={()=>{setDialog(!dialog)}} createRecord={createRecord} />
        </div>
    );
}

export default App;