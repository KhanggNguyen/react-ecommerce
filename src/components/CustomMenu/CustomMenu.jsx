import { Box, List, ListItem, Typography } from "@material-ui/core";
import React from "react";

import useStyles from "./styles";

const CustomMenu = (props) => {
    const classes = useStyles();

    const renderOptions = (options) => {
        let newOptions = [];
        for (let option of options) {
            newOptions.push(
                <ListItem
                    key={option.name}
                    className={classes.menuListElementHoverMenu}
                >
                    {option.parentId ? (
                        <a href={`${props.href}${option.slug}`}>
                            <Typography
                                variant="body2"
                                className={classes.menuListElementSpan}
                            >
                                {option.name}
                            </Typography>
                        </a>
                    ) : (
                        <Typography
                            variant="body2"
                            className={classes.menuListElementSpan}
                        >
                            {option.name}
                        </Typography>
                    )}
                    {option.children.length > 0 ? (
                        <List
                            className={`${classes.menuList} ${classes.menuListMenu}`}
                        >
                            {renderOptions(option.children)}
                        </List>
                    ) : null}
                </ListItem>
            );
        }

        return newOptions;
    };

    return (
        <Box className={classes.menu}>
            <List className={classes.menuList}>
                {props.options?.length > 0
                    ? renderOptions(props.options)
                    : null}
            </List>
        </Box>
    );
};

export default CustomMenu;
