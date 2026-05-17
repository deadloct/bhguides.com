import React, { useState } from "react";
import { useDebounce } from "use-debounce";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import styles from "./index.module.css";
import { VerticalSpacing } from "../../utils/utils";
import DieIcon from "@mui/icons-material/Casino";
import StreakChart from "../StreakChart";

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
        let winCounter = 0;
        let bestWinStreak = 0;
        let worstLossStreak = 0;
        const winStreakCounts = {};
        const lossStreakCounts = {};
        let totalWins = 0;
        let totalLosses = 0;

        for (let i = 0; i < gameCount; i++) {
            if (getRandomInt(1, fullSet + 1) <= winners) {
                if (lossCounter > 0) {
                    lossStreakCounts[lossCounter] = (lossStreakCounts[lossCounter] || 0) + 1;
                    if (lossCounter > worstLossStreak) worstLossStreak = lossCounter;
                }
                lossCounter = 0;
                winCounter++;
                totalWins++;
            } else {
                if (winCounter > 0) {
                    winStreakCounts[winCounter] = (winStreakCounts[winCounter] || 0) + 1;
                    if (winCounter > bestWinStreak) bestWinStreak = winCounter;
                }
                winCounter = 0;
                lossCounter++;
                totalLosses++;
            }
        }

        // Capture any streak still in progress at the end of the simulation
        if (lossCounter > 0) {
            lossStreakCounts[lossCounter] = (lossStreakCounts[lossCounter] || 0) + 1;
            if (lossCounter > worstLossStreak) worstLossStreak = lossCounter;
        }
        if (winCounter > 0) {
            winStreakCounts[winCounter] = (winStreakCounts[winCounter] || 0) + 1;
            if (winCounter > bestWinStreak) bestWinStreak = winCounter;
        }

        const actualWinRate = (totalWins / gameCount * 100).toFixed(2);

        return {
            actualWinRate,
            totalWins,
            totalLosses,
            gameCount,
            winStreakCounts,
            lossStreakCounts,
            bestWinStreak,
            worstLossStreak,
        };
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
                <p>Out of <strong>{results.gameCount.toLocaleString()}</strong> eggs opened:</p>
                <ul>
                    <li>Effective legendary drop rate: <strong>{results.actualWinRate}%</strong></li>
                    <li>Eggs with at least one legendary: <strong>{results.totalWins.toLocaleString()}</strong></li>
                    <li>Eggs with no legendaries: <strong>{results.totalLosses.toLocaleString()}</strong></li>
                    <li>Longest lucky streak: <strong>{results.bestWinStreak}</strong> eggs in a row with a legendary</li>
                    <li>Longest dry streak: <strong>{results.worstLossStreak}</strong> eggs in a row with no legendaries</li>
                </ul>

                <h3>Streak Distribution</h3>
                <StreakChart results={results} />
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
