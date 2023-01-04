import * as React from 'react';
import {FC} from 'react';
import '../App.css';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const UserMessage : FC<{handleClose:void, message:any}> = ({handleClose, message}) => {
    return (
        <Snackbar open={message.open} autoHideDuration={1500} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={message.type} sx={{ width: '100%' }}>
                { message.text }
            </MuiAlert>
        </Snackbar>
    );
}

export default UserMessage;