import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    background: {
      default: grey[400],
    },
  },
  typography: {
    fontFamily: '\'Comic Sans MS\', \'Comic Sans\', cursive',
    h1: {
      fontSize: '2rem',
      textAlign: 'center',
      marginBottom: '20px',
    },
    h2: {
      fontSize: '1.5rem',
      marginBottom: '15px',
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: grey[900],
          border: '2px solid #000',
          borderRadius: '10px',
          backgroundColor: '#fff',
          boxShadow: '3px 3px 0px #000',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '20px',
          border: '2px solid #000',
          borderRadius: '10px',
          backgroundColor: '#fff',
          boxShadow: '3px 3px 0px #000',
          margin: '20px auto',
          width: 'calc(100% - 40px)',
          maxWidth: '680px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            border: '2px solid #000',
            borderRadius: '5px',
            boxShadow: '2px 2px 0px #000',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: grey[900],
          '&.Mui-focused': {
            color: grey[900],
          },
          '&.MuiFormLabel-filled': {
            color: grey[900],
          },
        },
        shrink: {
          transform: 'translate(5px, -20px) scale(0.75)',
        },
      },
    },
  },
});

export default theme;
