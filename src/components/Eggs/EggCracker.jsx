import React, { useState } from "react";
import { useDebounce } from "use-debounce";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import styles from "./index.module.css";
import { VerticalSpacing } from "../../utils/utils";
import DieIcon from "@mui/icons-material/Casino";

export default function EggCracker() {
    const [rawWinChance, setRawWinChance] = useState(3.4);
    const [winChance] = useDebounce(rawWinChance, 500);
    const [rawGameCount, setRawGameCount] = useState(10000);
    const [gameCount] = useDebounce(rawGameCount, 500);
    const [results, setResults] = useState(null);

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
        <Container className={styles["outer-container"]} maxWidth="md" key="eggcracker">
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
        </Container>
    );
}
