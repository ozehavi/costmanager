/*
Developers:
Oren Zehavi ID: 315940429
Matan Maimon ID: 207275959
*/
import * as React from 'react';
import {FC, useState} from 'react';
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
import Badge from '@mui/material/Badge';
import {manager} from "../App";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: '200px',
}));

const RecordsFilter : FC<{filterRecords: (filter: any) => void}> = ({filterRecords}) => {
    const emptyFormValues = {category:'All', month:'All', year: 'All'};
    const [formValues, setFormValues] = useState(emptyFormValues);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
        filterRecords({ ...formValues, [name]: value });
    }

    return (
        <Accordion style={{backgroundColor: "#e6e6e6"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
                style={{display:'inline-flex'}}>
                <Typography>
                    <Badge
                        variant='dot'
                        invisible={JSON.stringify(formValues) === JSON.stringify(emptyFormValues)}
                        color='success'
                        anchorOrigin={{ vertical: 'top', horizontal: 'left'}}
                    >Filter Records</Badge>
                </Typography>
            </AccordionSummary>
            <AccordionDetails style={{display:'inline-flex'}}>
                <Stack direction='row'
                       divider={<Divider orientation='vertical' flexItem />}
                       spacing={2}>
                    <Item>
                        <TextField
                            id='category'
                            name='category'
                            select
                            label='Category'
                            defaultValue='All'
                            fullWidth
                            onChange={handleInputChange}
                        >
                            {manager.categoriesOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {manager.categoriesIcons[option]} {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Item>
                    <Item>
                        <TextField
                            id='month'
                            name='month'
                            select
                            label='Month'
                            defaultValue='All'
                            fullWidth
                            onChange={handleInputChange}
                        >
                            {manager.monthOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Item>
                    <Item>
                        <TextField
                            id='year'
                            name='year'
                            select
                            label='Year'
                            defaultValue='All'
                            fullWidth
                            onChange={handleInputChange}
                        >
                            {manager.yearOptions.map((option) => (
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