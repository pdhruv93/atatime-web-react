import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
            .pac-container {
                z-index: 2000 !important;
            }
        `,
    },
  },
});
