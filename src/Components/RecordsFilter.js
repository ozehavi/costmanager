import * as React from 'react';
import {FC} from 'react';
import Typography from '@mui/material/Typography';
import '../App.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import {categoriesIcons} from "../App";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: '200px',
}));

const RecordsFilter : FC<{filter:void}> = ({filter}) => {
    const categoriesOptions = ['All', 'Food', 'Furniture', 'Fashion', 'Health', 'HouseHold', 'Office Equipment', 'Pet Care'];
    const monthOptions = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const yearOptions = ['All', '2020', '2021', '2022', '2023', '2024'];

    return (
        <Accordion style={{backgroundColor: "#e6e6e6"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{display:"inline-flex"}}
            >
                <Typography>Filter Records</Typography>
            </AccordionSummary>
            <AccordionDetails style={{display:"inline-flex"}}>
                <Stack direction="row"
                       divider={<Divider orientation="vertical" flexItem />}
                       spacing={2}>
                    <Item>
                        <TextField
                            id="filterCategory"
                            select
                            label="Category"
                            defaultValue="All"
                            fullWidth
                        >
                            {categoriesOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {categoriesIcons[option]} {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Item>
                    <Item>
                        <TextField
                            id="filterCategory"
                            select
                            label="Month"
                            defaultValue="All"
                            fullWidth
                        >
                            {monthOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Item>
                    <Item>
                        <TextField
                            id="filterYear"
                            select
                            label="Year"
                            defaultValue="All"
                            fullWidth
                        >
                            {yearOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Item>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

export default RecordsFilter;