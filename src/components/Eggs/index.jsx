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
        small: 200,
        large: 700,
        mega: 4200,
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
            const chance = `${(overall * 100).toFixed(2)}%`;
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

    const generatePercentageTable = () => {
        const LegChance = {
            small: 0.001,
            large: 0.034,
            mega: 0.213,
        };

        const prices = { small: smallPrice, large: largePrice, mega: megaPrice };
        
        // Calculate LCM of large and mega prices
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const lcm = (a, b) => (a * b) / gcd(a, b);
        const increment = lcm(prices.large, prices.mega);
        
        const maxRows = Math.floor(100000 / increment);
        const rows = [];
        
        for (let i = 1; i <= maxRows; i++) {
            const gems = increment * i;
            const row = { gems };
            
            ['small', 'large', 'mega'].forEach(size => {
                const eggCount = Math.floor(gems / prices[size]);
                const prob = LegChance[size];
                const overall = eggCount > 0 ? 1 - Math.pow(1 - prob, eggCount) : 0;
                row[size] = `${(overall * 100).toFixed(2)}%`;
            });
            
            rows.push(row);
        }
        
        return rows;
    };

    const percentageData = generatePercentageTable();

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
                        label="Large Price"
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
                    <h3>Results</h3>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow> 
                                    <TableCell>Size</TableCell>
                                    <TableCell>Eggs</TableCell>
                                    <TableCell>Gems</TableCell>
                                    <TableCell>Leg Chance</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {resultsData.map((result) => (
                                    <TableRow key={result.size}>
                                        <TableCell className={styles["size"]}>
                                            {result.size === 'small' ? 'Small' : 
                                             result.size === 'large' ? 'Large' : 'Mega'}
                                        </TableCell>
                                        <TableCell>{result.eggCount}</TableCell>
                                        <TableCell>
                                            {result.totalCost}{result.remainingGems > 0 ? ` (${result.remainingGems} left)` : ''}
                                        </TableCell>
                                        <TableCell>{result.chance}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box mt={VerticalSpacing} flexDirection="column">
                    <h3>Legendary Chances by Gem Amount</h3>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Gems</TableCell>
                                    <TableCell>Small %</TableCell>
                                    <TableCell>Large %</TableCell>
                                    <TableCell>Mega %</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {percentageData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.gems.toLocaleString()}</TableCell>
                                        <TableCell>{row.small}</TableCell>
                                        <TableCell>{row.large}</TableCell>
                                        <TableCell>{row.mega}</TableCell>
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