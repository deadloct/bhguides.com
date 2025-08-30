import React, { useEffect, useState } from "react";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import styles from "./index.module.css";
import { VerticalSpacing } from "../Tools/utils";

export default function RNGME() {

    const DefaultPrices = {
        small: 180,
        large: 750,
        mega: 5100,
    };

    const [eggCount, setEggCount] = useState(1);
    const [eggSize, setEggSize] = useState("large");
    const [eggGems, setEggGems] = useState(DefaultPrices["large"]);
    const [eggChance, setEggChance] = useState(0);
    const [totalEggGems, setTotalEggGems] = useState(DefaultPrices["large"]);

    useEffect(() => {
        const LegChance = {
            small: 0.001,
            large: 0.034,
            mega: 0.213,
        };
        const prob = LegChance[eggSize];
        const overall = 1 - Math.pow(1 - prob, eggCount);
        const pct = `${(overall * 100).toFixed(4)}%`;
        setTotalEggGems(eggCount * eggGems);
        setEggChance(pct);
    }, [eggCount, eggSize, eggGems])

    function handleEggSizeChange(e) {
        const val = e.target.value;
        setEggSize(val);
        setEggGems(DefaultPrices[val]);
    }

    return (
        <Container className={styles["outer-container"]} maxWidth="md" key="rngmecontainer">
            <section id="pets">
                <h2>Egg and Accessory Chest Calculator</h2>
                <p>Fishing for a legendary? Here are your chances!</p>
                <Box mt={VerticalSpacing} flexDirection="column">
                    <FormControl fullWidth>
                        <TextField id="count"
                            name="count"
                            label="Count"
                            type="number"
                            min="1"
                            onChange={e => setEggCount(e.target.value)}
                            defaultValue="1"
                        />
                    </FormControl>
                </Box>
                <Box mt={VerticalSpacing} flexDirection="column">
                    <FormControl fullWidth>
                        <Select id="size"
                            name="size"
                            defaultValue="large"
                            label=""
                            onChange={handleEggSizeChange}
                        >
                            <MenuItem key={1} value="small">Small</MenuItem>   
                            <MenuItem key={2} value="large">Large/Hyper</MenuItem>   
                            <MenuItem key={3} value="mega">Mega</MenuItem>   
                        </Select>
                    </FormControl>
                </Box>
                <Box mt={VerticalSpacing} flexDirection="column">
                    <FormControl fullWidth>
                        <TextField id="price"
                            name="price"
                            label="Gem Price Per Item"
                            type="number"
                            min="1"
                            onChange={e => setEggGems(e.target.value)}
                            value={eggGems}
                        />
                    </FormControl>
                </Box>
                <Box mt={VerticalSpacing} flexDirection="column"> 
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow> 
                                    <TableCell>Count</TableCell>
                                    <TableCell>Size</TableCell>
                                    <TableCell>Gems</TableCell>
                                    <TableCell>Leg Chance</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{eggCount}</TableCell>
                                    <TableCell className={styles["size"]}>{eggSize}</TableCell>
                                    <TableCell>{totalEggGems}</TableCell>
                                    <TableCell>{eggChance}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </section>
        </Container>
    )
}