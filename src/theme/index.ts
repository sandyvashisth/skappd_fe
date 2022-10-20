import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1EC271',
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