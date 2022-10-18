import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2192FF',
        },
        secondary: {
            main: '#9CFF2E',
        },
    },
    components: {
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    background: "#FFF",
                    '& ::before':{
                        borderColor: 'green'
                    }
                }
            }
        },
    }
});

export default theme;