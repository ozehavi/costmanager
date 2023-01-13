import * as React from 'react';
import {FC} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const pages = ['Records', 'Report'];

const ResponsiveAppBar : FC<{openCreateDialog:void}> = ({openCreateDialog}) => {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Cost Manager
                        </Typography>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Cost Manager
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Create a new record">
                                <IconButton onClick={openCreateDialog} sx={{ p: 0 }}>
                                    <AddCircleOutlineIcon fontSize={"large"} sx={{color: 'white'}}/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}
export default ResponsiveAppBar;