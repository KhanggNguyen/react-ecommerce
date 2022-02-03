import React from "react";
import { Box, createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { Navbar, Footer } from "..";

const mdTheme = createTheme();

const Layout = (props) => {
    return (
        <ThemeProvider theme={mdTheme}>
            <Box
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    minHeight: "100vh",
                    overflow: "auto",
                    margin: "0",
                    padding: "0",
                }}
            >
                <Navbar title={props.title} />
                {props.children}

                <Footer />
            </Box>
        </ThemeProvider>
    );
};

export default Layout;
