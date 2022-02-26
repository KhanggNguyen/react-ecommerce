import React, { useState, useRef, useImperativeHandle } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowRight from "@material-ui/icons/ArrowRight";

import useStyles from "./styles";
/**
 * parentMenuOpen: boolean
 * component?: React.ElementType
 * label?: React.ReactNode
 * rightIcon?: React.ReactNode
 * ContainerProps?: React.HTMLAttributes<HTMLElement> &
    React.RefAttributes<HTMLElement | null>
 * MenuProps?: Omit<MenuProps, 'children'>
 * button?: true | undefined
 */
const NestedMenuItem = React.forwardRef((props, ref) => {
    const {
        parentMenuOpen,
        label,
        rightIcon = <ArrowRight />,
        children,
        tabIndex: tabIndexProp,
        ContainerProps: ContainerPropsProp = {},
        ...MenuItemProps
    } = props;

    const { ref: containerRefProp, ...ContainerProps } = ContainerPropsProp;

    const menuItemRef = useRef(null);
    useImperativeHandle(ref, () => menuItemRef.current);

    const containerRef = useRef(null);
    useImperativeHandle(containerRefProp, () => containerRef.current);

    const menuContainerRef = useRef(null);

    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const handleMouseEnter = (event) => {
        setIsSubMenuOpen(true);

        if (ContainerProps?.onMouseEnter) {
            ContainerProps.onMouseEnter(event);
        }
    };

    const handleMouseLeave = (event) => {
        setIsSubMenuOpen(false);

        if (ContainerProps?.onMouseLeave) {
            ContainerProps.onMouseLeave(event);
        }
    };

    const handleFocus = (event) => {
        if (event.target === containerRef.current) {
            setIsSubMenuOpen(true);
        }

        if (ContainerProps?.onFocus) {
            ContainerProps.onFocus(event);
        }
    };

    // Root element must have a `tabIndex` attribute for keyboard navigation
    let tabIndex;
    if (!props.disabled) {
        tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
    }

    const open = isSubMenuOpen && parentMenuOpen;

    const classes = useStyles({ open });

    return (
        <div
            {...ContainerProps}
            ref={containerRef}
            onFocus={handleFocus}
            tabIndex={tabIndex}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <MenuItem
                {...MenuItemProps}
                className={classes.root}
                ref={menuItemRef}
            >
                {label}
                {rightIcon}
            </MenuItem>
            <Menu
                // Set pointer events to 'none' to prevent the invisible Popover div
                // from capturing events for clicks and hovers
                style={{ pointerEvents: "none" }}
                anchorEl={menuItemRef.current}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                open={open}
                autoFocus={false}
                disableAutoFocus
                disableEnforceFocus
                onClose={() => {
                    setIsSubMenuOpen(false);
                }}
            >
                <div ref={menuContainerRef} style={{ pointerEvents: "auto" }}>
                    {children}
                </div>
            </Menu>
        </div>
    );
});

NestedMenuItem.displayName = "NestedMenuItem";

export default NestedMenuItem;
