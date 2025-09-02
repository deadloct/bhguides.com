import React, { useState } from "react";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
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

export default function Eggs() {

    const DefaultPrices = {
        small: 180,
        large: 750,
        mega: 5100,
    };

    const [smallPrice, setSmallPrice] = useState(DefaultPrices.small);
    const [largePrice, setLargePrice] = useState(DefaultPrices.large);
    const [megaPrice, setMegaPrice] = useState(DefaultPrices.mega);
    const [totalGems, setTotalGems] = useState(DefaultPrices.mega);

    const calculateEggsAndChances = () => {
        const LegChance = {
            small: 0.001,
            large: 0.034,
            mega: 0.213,
        };

        const sizes = ['small', 'large', 'mega'];
        const prices = { small: smallPrice, large: largePrice, mega: megaPrice };
        
        return sizes.map(size => {
            const price = prices[size];
            const eggCount = Math.floor(totalGems / price);
            const prob = LegChance[size];
            const overall = eggCount > 0 ? 1 - Math.pow(1 - prob, eggCount) : 0;
            const chance = `${(overall * 100).toFixed(4)}%`;
            const remainingGems = totalGems - (eggCount * price);
            
            return {
                size,
                price,
                eggCount,
                chance,
                totalCost: eggCount * price,
                remainingGems
            };
        });
    };

    const resultsData = calculateEggsAndChances();

    return (
        <Container className={styles["outer-container"]} maxWidth="md" key="eggscontainer">
            <section id="pets">
                <h2>Egg and Accessory Chest Calculator</h2>
                <p>Fishing for a legendary? Here are your chances!</p>
                <Box mt={VerticalSpacing} display="flex" gap={2} flexWrap="wrap">
                    <TextField
                        label="Small Price"
                        type="number"
                        min="1"
                        value={smallPrice}
                        onChange={e => setSmallPrice(Number(e.target.value))}
                        sx={{ flex: '1 1 200px', minWidth: '150px' }}
                    />
                    <TextField
                        label="Large/Hyper Price"
                        type="number"
                        min="1"
                        value={largePrice}
                        onChange={e => setLargePrice(Number(e.target.value))}
                        sx={{ flex: '1 1 200px', minWidth: '150px' }}
                    />
                    <TextField
                        label="Mega Price"
                        type="number"
                        min="1"
                        value={megaPrice}
                        onChange={e => setMegaPrice(Number(e.target.value))}
                        sx={{ flex: '1 1 200px', minWidth: '150px' }}
                    />
                </Box>
                <Box mt={VerticalSpacing} flexDirection="column">
                    <FormControl fullWidth>
                        <TextField
                            label="Total Gems to Spend"
                            type="number"
                            min="1"
                            value={totalGems}
                            onChange={e => setTotalGems(Number(e.target.value))}
                        />
                    </FormControl>
                </Box>
                <Box mt={VerticalSpacing} flexDirection="column"> 
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow> 
                                    <TableCell>Size</TableCell>
                                    <TableCell>Price Per Egg</TableCell>
                                    <TableCell>Eggs</TableCell>
                                    <TableCell>Gems Used</TableCell>
                                    <TableCell>Remaining Gems</TableCell>
                                    <TableCell>Leg Chance</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {resultsData.map((result) => (
                                    <TableRow key={result.size}>
                                        <TableCell className={styles["size"]}>
                                            {result.size === 'small' ? 'Small' : 
                                             result.size === 'large' ? 'Large/Hyper' : 'Mega'}
                                        </TableCell>
                                        <TableCell>{result.price}</TableCell>
                                        <TableCell>{result.eggCount}</TableCell>
                                        <TableCell>{result.totalCost}</TableCell>
                                        <TableCell>{result.remainingGems}</TableCell>
                                        <TableCell>{result.chance}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </section>
        </Container>
    )
}