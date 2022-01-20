import React from "react";
import { Box, createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { Navbar } from "..";


const mdTheme = createTheme();

const Layout = (props) => {
    return (
        <ThemeProvider theme={mdTheme}>
            <Box
                style={{
                    display: "flex",
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <Navbar title={props.title} />
                {props.children}
            </Box>
        </ThemeProvider>
    );
};

export default Layout;
