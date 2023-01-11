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

// const a = [{"id":"1","title":"title1","type":"Gaz","price":"100$"},{"id":"2","title":"title2","type":"Gaz","price":"200$"},{"id":"3","title":"title3","type":"Gaz","price":"300$"},{"id":"4","title":"title4","type":"Gaz","price":"400$"},{"id":"5","title":"title5","type":"Gaz","price":"500$"}];
// const [selectedServerKey, setSelectedServerKey] = useLocalStorage<string | null | undefined>("jcreate-selected-server-key")
function App() {
    const [records, setRecords] = useState([]);
    const [message, setMessage] = React.useState({open:false, type:"success", text:""});
    const [dialog, setDialog] = useState(false);


    useEffect(() => {
        let records =  JSON.parse(localStorage.getItem('records')) ?? [];
        setRecords(records);
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