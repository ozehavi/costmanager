import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {FC, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import {FormControl} from "@mui/material";

export const FormDialog : FC<{dialogState:boolean, handleDialog: () => void, createRecord: (data: any) => void}> = ({dialogState, handleDialog, createRecord}) => {
    const [formValues, setFormValues] = useState({recordTitle:'', recordDescription:'', recordPrice: 0, recordCategory:'EUR'})

    const categories = [
        {value: 'Food', label: 'Food'},
        {value: 'Furniture', label: 'Furniture'},
        {value: 'Fashion', label: 'Fashion'},
        {value: 'Health', label: 'Health'},
        {value: 'HouseHold', label: 'HouseHold'},
        {value: 'Office Equipment', label: 'Office Equipment'},
        {value: 'Pet Care', label: 'Pet Care'}
    ];

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        createRecord(formValues)
    };

    return (
        <div>
            <Dialog open={dialogState} onClose={handleDialog}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Create a new record</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please add your record details:
                        </DialogContentText>
                        <FormControl>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="recordTitle"
                                name="recordTitle"
                                label="Title"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleInputChange}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="recordDescription"
                                name="recordDescription"
                                label="Description"
                                type="text"
                                fullWidth
                                variant="standard"
                                multiline
                                rows={4}
                                onChange={handleInputChange}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="recordPrice"
                                name="recordPrice"
                                label="Price"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={handleInputChange}
                            />
                            <br />
                            <TextField
                                id="recordCategory"
                                name="recordCategory"
                                select
                                label="Category"
                                fullWidth
                                style={{marginTop: "20px"}}
                                defaultValue="EUR"
                                onChange={handleInputChange}
                            >
                                {categories.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialog}>Cancel</Button>
                        <Button type="submit" variant="contained">Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}