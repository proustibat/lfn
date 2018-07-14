import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blueGrey from '@material-ui/core/colors/blueGrey';
import CssBaseline from '@material-ui/core/CssBaseline';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme( {
    palette: {
        primary: {
            light: red[ 300 ],
            main: red[ 500 ],
            dark: red[ 700 ]
        },
        secondary: {
            veryLight: blueGrey[ 100 ],
            light: blueGrey[ 300 ],
            main: blueGrey[ 500 ],
            dark: blueGrey[ 700 ],
        },
    },

    spacing: {
        sizeS: '1rem',
        sizeM: '2rem',
        sizeL: '3rem',
    },

    sizing: {
        sizeS: '1rem',
        sizeM: '1.5rem',
        sizeL: '2rem',
    },
} );

export default Component => props => (
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
    </MuiThemeProvider>
);
