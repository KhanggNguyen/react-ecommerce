import React, {useState, useEffect} from "react";
import Address from "./Address";
import { useSelector } from "react-redux";
import { Box, Button, Divider, Grid } from "@material-ui/core";
import AddressForm from "./AddressForm";

const Addresses = ({ onSelect }) => {
    const user = useSelector((state) => state.user);

    const [newAddress, setNewAddress] = useState(false);
    const [address, setAddress] = useState([]);

    const handleEnableAddressEditForm = (addr) => {
        const updatedAddress = address.map((item) =>
            item._id === addr._id
                ? { ...item, edit: !item.edit }
                : { ...item, edit: false }
        );

        setAddress(updatedAddress);
    };

    useEffect( () => {
        const address = user.address?.map((item) => {
            return {
                ...item,
                selected: false,
                edit: false,
            };
        });

        setAddress(address);
    }, [])

    return (
        <>
            {address?.map((item) => (
                <Address
                    addr={item}
                    onSelect={onSelect}
                    onEnableEdit={handleEnableAddressEditForm}
                    key={item._id}
                />
            ))}
            <Divider />
            <Box className={{margin: "10px 0"}}>
                <Grid
                    container
                    spacing={3}
                    columnspacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid item xs={12} sm={6}>
                        {newAddress ? (
                            <Button
                                color="default"
                                variant="contained"
                                onClick={() => setNewAddress(false)}
                            >
                                Cancel
                            </Button>
                        ) : null}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" justifyContent="right">
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => setNewAddress(true)}
                            >
                                New Address
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {newAddress ? <AddressForm /> : null}
        </>
    );
};

export default Addresses;
