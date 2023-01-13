import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from "@mui/material/MenuItem";
import {FormControl} from "@mui/material";
import {categories, categoriesIcons} from "../App";
import Alert from '@mui/material/Alert';

export const FormDialog : FC<{dialogState:boolean, handleDialog: () => void, createRecord: (data: any) => void}> = ({dialogState, handleDialog, createRecord}) => {
    const emptyFormValues = {recordTitle:'', recordDescription:'', recordPrice: 0, recordCategory:'Food'};
    const [formValues, setFormValues] = useState(emptyFormValues);
    const [errors, setErrors] = useState([]);
    const [errorMessage, setErrorMessage] = useState([]);

    useEffect(() => {
        setErrors([]);
        setErrorMessage([]);
    }, [dialogState]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        const errorsList = [];
        const messagesList = [];
        if(formValues.recordTitle === ''){
            errorsList.push('recordTitle');
            messagesList.push('Record title must have value');
        }
        if(formValues.recordPrice <= 0){
            errorsList.push('recordPrice');
            messagesList.push('Record price must be a positive value');
        }
        setErrors(errorsList);
        setErrorMessage(messagesList);

        if(errorsList.length > 0)
            return;

        createRecord(formValues);
        setFormValues(emptyFormValues);
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
                                error={errors.includes("recordTitle")}
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
                                error={errors.includes("recordPrice")}
                            />
                            <br />
                            <TextField
                                id="recordCategory"
                                name="recordCategory"
                                select
                                label="Category"
                                fullWidth
                                style={{marginTop: "20px"}}
                                defaultValue="Food"
                                onChange={handleInputChange}
                            >
                                {categories.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {categoriesIcons[option.value]} {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        { errors.length > 0 &&
                            errorMessage.map((err, idx) =><Alert severity="error" key={idx}>{err}</Alert>)
                        }
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