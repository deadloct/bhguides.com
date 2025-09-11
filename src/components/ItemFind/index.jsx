import React from "react";
import Divider from "@mui/material/Divider";

import SimpleIFCalc from "./simple-if-calc";
import StandardIFCalc from "./standard-if-calc";

export default function ItemFind() {
    return (
        <>
            <SimpleIFCalc />
            <Divider />
            <StandardIFCalc />
        </>
    );
}