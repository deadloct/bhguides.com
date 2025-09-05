import React, { useState } from "react";
import { useDebounce } from "use-debounce";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import styles from "./index.module.css";
import { VerticalSpacing } from "../Tools/utils";
import DieIcon from "@mui/icons-material/Casino";

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

    const [rawWinChance, setRawWinChance] = useState(3.4);
    const [winChance] = useDebounce(rawWinChance, 500);
    const [rawGameCount, setRawGameCount] = useState(10000);
    const [gameCount] = useDebounce(rawGameCount, 500);
    const [results, setResults] = useState(null);

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

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function unreduce(percent, set = 100) {
        if (percent % Math.floor(percent) === 0) {
            return [percent, set];
        }

        return unreduce(percent * 10, set * 10);
    }

    function calculate() {
        const [winners, fullSet] = unreduce(winChance);

        let lossCounter = 0;
        let losingStreaks = {
            'worst': 0,
            '5+': 0,
            '10+': 0,
            '20+': 0,
            '30+': 0,
            '40+': 0,
            '50+': 0
        };
        let totalLosses = 0;

        let winCounter = 0;
        let winningStreaks = {
            'best': 0,
            '2+': 0,
            '5+': 0,
            '10+': 0,
            '20+': 0,
            '30+': 0,
            '40+': 0
        };
        let totalWins = 0;

        for (let i = 0; i < gameCount; i++) {
            if (getRandomInt(1, fullSet + 1) <= winners) {
                losingStreaks.worst = Math.max(lossCounter, losingStreaks.worst);
                if (lossCounter >= 5) losingStreaks['5+']++;
                if (lossCounter >= 10) losingStreaks['10+']++;
                if (lossCounter >= 20) losingStreaks['20+']++;
                if (lossCounter >= 30) losingStreaks['30+']++;
                if (lossCounter >= 40) losingStreaks['40+']++;
                if (lossCounter >= 50) losingStreaks['50+']++;
                lossCounter = 0;
                winCounter++;
                totalWins++;
            } else {
                winningStreaks.best = Math.max(winCounter, winningStreaks.best);
                if (winCounter >= 2) winningStreaks['2+']++;
                if (winCounter >= 5) winningStreaks['5+']++;
                if (winCounter >= 10) winningStreaks['10+']++;
                if (winCounter >= 20) winningStreaks['20+']++;
                if (winCounter >= 30) winningStreaks['30+']++;
                if (winCounter >= 40) winningStreaks['40+']++;
                winCounter = 0;
                lossCounter++;
                totalLosses++;
            }
        }

        // Handle final streaks if simulation ends during a streak
        losingStreaks.worst = Math.max(lossCounter, losingStreaks.worst);
        if (lossCounter >= 5) losingStreaks['5+']++;
        if (lossCounter >= 10) losingStreaks['10+']++;
        if (lossCounter >= 20) losingStreaks['20+']++;
        if (lossCounter >= 30) losingStreaks['30+']++;
        if (lossCounter >= 40) losingStreaks['40+']++;
        if (lossCounter >= 50) losingStreaks['50+']++;
        
        winningStreaks.best = Math.max(winCounter, winningStreaks.best);
        if (winCounter >= 2) winningStreaks['2+']++;
        if (winCounter >= 5) winningStreaks['5+']++;
        if (winCounter >= 10) winningStreaks['10+']++;
        if (winCounter >= 20) winningStreaks['20+']++;
        if (winCounter >= 30) winningStreaks['30+']++;
        if (winCounter >= 40) winningStreaks['40+']++;

        const actualWinRate = (totalWins / gameCount * 100).toFixed(2);

        return {
            actualWinRate,
            totalWins,
            totalLosses,
            gameCount,
            losingStreaks,
            winningStreaks
        }
    }

    function handleCalculateClick() {
        setResults(calculate());
    }

    function handleWinChanceChange(e) {
        let v = e.target.value;
        if (isNaN(v)) return;
        if (v < 0 || v > 100) return;
        setRawWinChance(v);
    }

    function handleGameCountChange(e) {
        let v = e.target.value;
        if (isNaN(v)) return;
        if (v < 0) return;
        setRawGameCount(v);
    }

    function displayResults() {
        if (results === null) {
            return (
                <div>
                    <h2>Results</h2>
                    <p>Roll the dice and try your luck!</p>
                </div>
            )
        }

        return (
            <div>
                <h2>Results</h2>
                <p>Your drop rate of eggs with 1+ legendaries was <strong>{results.actualWinRate}%</strong>, successfully getting <strong>{results.totalWins}</strong> eggs with 1+ legendaries but striking out on <strong>{results.totalLosses}</strong>.</p>
                <p>
                    Your worst streak of dud eggs was <strong>{results.losingStreaks["worst"]}</strong>, but your best streak of eggs with 1+ legs
                    was <strong>{results.winningStreaks["best"]}</strong>.
                </p>

                <h3>Dry Streak Counts</h3>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>5+</TableCell>
                                <TableCell>10+</TableCell>
                                <TableCell>20+</TableCell>
                                <TableCell>30+</TableCell>
                                <TableCell>40+</TableCell>
                                <TableCell>50+</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{results.losingStreaks["5+"]}</TableCell>
                                <TableCell>{results.losingStreaks["10+"]}</TableCell>
                                <TableCell>{results.losingStreaks["20+"]}</TableCell>
                                <TableCell>{results.losingStreaks["30+"]}</TableCell>
                                <TableCell>{results.losingStreaks["40+"]}</TableCell>
                                <TableCell>{results.losingStreaks["50+"]}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <h3>Lucky Streak Counts</h3>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>2+</TableCell>
                                <TableCell>5+</TableCell>
                                <TableCell>10+</TableCell>
                                <TableCell>20+</TableCell>
                                <TableCell>30+</TableCell>
                                <TableCell>40+</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{results.winningStreaks["2+"]}</TableCell>
                                <TableCell>{results.winningStreaks["5+"]}</TableCell>
                                <TableCell>{results.winningStreaks["10+"]}</TableCell>
                                <TableCell>{results.winningStreaks["20+"]}</TableCell>
                                <TableCell>{results.winningStreaks["30+"]}</TableCell>
                                <TableCell>{results.winningStreaks["40+"]}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer> 
            </div>
        );
    }

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

                <Divider sx={{ mt: 4, mb: 4 }} />

                <section id="eggs">
                    <h2>Let&apos;s open some eggs!</h2>
                    <p><em>&quot;Why didn&apos;t I get a legendary after 30 large eggs?! 3.4% chance my ass!&quot; --frustrated players</em></p>
                    <Box mt={VerticalSpacing} flexDirection="column">
                        <FormControl fullWidth>
                            <TextField id="win-chance"
                                name="win-chance"
                                label="Legendary Chance (%)"
                                type="number"
                                placeholder="i.e. 3.4"
                                min="0"
                                max="100"
                                onChange={handleWinChanceChange}
                                defaultValue={winChance}
                            />
                        </FormControl>
                    </Box>

                    <Box mt={VerticalSpacing} flexDirection="column">
                        <FormControl fullWidth>
                            <TextField id="game-count"
                                name="game-count"
                                label="Number of Egg Opening Attempts"
                                type="number"
                                placeholder="i.e. 1000"
                                min="0"
                                onChange={handleGameCountChange}
                                defaultValue={gameCount}
                                helperText="Large numbers on slow computers can crash your browser. YMMV but I start seeing performance degredation at around 10 million."
                            />
                        </FormControl>
                    </Box>

                    <Box mt={VerticalSpacing} flexDirection="column">
                        <Button className={styles["roll-button"]} variant="contained" onClick={() => handleCalculateClick()}>
                            <DieIcon fontSize={"medium"} />
                            <div>Roll the Dice</div>
                            <DieIcon fontSize={"medium"} />
                        </Button>
                    </Box>

                    <Box mt={VerticalSpacing} flexDirection="column">
                        {displayResults()}
                    </Box>
                </section>
            </section>
        </Container>
    )
}