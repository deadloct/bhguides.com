import React, { useState } from 'react';
import { useDebounce } from "use-debounce";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

import styles from "./index.module.css";
import { VerticalSpacing } from "../../utils/utils";
import DieIcon from "@mui/icons-material/Casino";
import StreakChart from "../StreakChart";

export default function FamiliarPersuades() {
    const [rawWinChance, setRawWinChance] = useState(20);
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
                <p>Out of <strong>{results.gameCount.toLocaleString()}</strong> persuade attempts:</p>
                <ul>
                    <li>Effective persuade rate: <strong>{results.actualWinRate}%</strong></li>
                    <li>Successful persuades: <strong>{results.totalWins.toLocaleString()}</strong></li>
                    <li>Failed persuades: <strong>{results.totalLosses.toLocaleString()}</strong></li>
                    <li>Longest winning streak: <strong>{results.bestWinStreak}</strong> persuades in a row</li>
                    <li>Longest losing streak: <strong>{results.worstLossStreak}</strong> fails in a row</li>
                </ul>

                <Box mt={VerticalSpacing}>
                    <StreakChart
                        results={results}
                        luckyTitle="Winning streaks"
                        luckySubtitle="Consecutive successful persuades"
                        unluckyTitle="Losing streaks"
                        unluckySubtitle="Consecutive failed persuades"
                        unitSingular="persuade"
                        unitPlural="persuades"
                    />
                </Box>
            </div>
        );
    }

    return (
        <Container key="fampersuades" className={styles["outer-container"]} maxWidth="md">
            <section id="fams">
                <h2>Familiar Persuades</h2>
                <p><em>&quot;Why did Grampz reject me 10 times in a row?! 20% chance my ass!&quot; --noobs</em></p>
                <Box mt={VerticalSpacing} flexDirection="column">
                    <FormControl fullWidth>
                        <TextField id="win-chance"
                            name="win-chance"
                            label="Win Chance"
                            type="number"
                            placeholder="i.e. 20"
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
                            label="Number of Persuade Attempts"
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
