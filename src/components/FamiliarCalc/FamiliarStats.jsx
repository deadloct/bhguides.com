import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import familiarsData from '../../redux/familiars.json';

import styles from "./index.module.css";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const SLIDER_MARKS = [
    { value: 1, label: '+0' },
    { value: 2, label: '+1' },
    { value: 3, label: '+2' },
    { value: 4, label: '+3' },
    { value: 5, label: '+4' },
    { value: 6, label: '+5' },
];

function computeStats(familiar, totalStats, stableCount) {
    if (!familiar || totalStats < 1) return null;

    const stableBonusStats = totalStats * (stableCount - 1) * 0.02;
    const totalPercentage = familiar.strength + familiar.stamina + familiar.agility;

    const baseStrength = totalStats * (familiar.strength / 100);
    const baseStamina = totalStats * (familiar.stamina / 100);
    const baseAgility = totalStats * (familiar.agility / 100);

    const strengthBonus = (stableBonusStats * familiar.strength) / totalPercentage;
    const staminaBonus = (stableBonusStats * familiar.stamina) / totalPercentage;
    const agilityBonus = (stableBonusStats * familiar.agility) / totalPercentage;

    return {
        strength: Math.round(baseStrength + strengthBonus),
        stamina: Math.round(baseStamina + staminaBonus),
        agility: Math.round(baseAgility + agilityBonus),
        stableBonus: stableBonusStats,
    };
}

export default function FamiliarStats() {
    const [comparisons, setComparisons] = useState([
        { id: 1, familiar: familiarsData[0] || null, stableCount: 1 },
    ]);
    const [totalStats, setTotalStats] = useState(65000);
    const [disclaimerVisible, setDisclaimerVisible] = useState(true);
    const [nextId, setNextId] = useState(2);

    const handleTotalStatsChange = (event) => {
        const value = parseInt(event.target.value) || 1;
        setTotalStats(Math.max(1, Math.min(130000, value)));
    };

    const addComparison = () => {
        setComparisons(prev => [...prev, { id: nextId, familiar: null, stableCount: 1 }]);
        setNextId(n => n + 1);
    };

    const removeComparison = (id) => {
        setComparisons(prev => prev.filter(c => c.id !== id));
    };

    const updateComparison = (id, updates) => {
        setComparisons(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    };

    return (
        <Container key="famstats" className={styles["outer-container"]} maxWidth="lg">
            <h2>Familiar Stats Calculator</h2>
            {disclaimerVisible && (
                <div className={`${styles["bubble"]} ${styles["ext-link-risk"]}`}>
                    <WarningAmberIcon />
                    <div className={styles["bubble-message"]}>
                        Data was scraped from <a href="https://bit-heroes.fandom.com/wiki">the wiki</a> on 29 June 2026.
                    </div>
                    <WarningAmberIcon />
                    <button
                        onClick={() => setDisclaimerVisible(false)}
                        className={styles["close-button"]}
                        aria-label="Close disclaimer"
                    >
                        <CloseIcon />
                    </button>
                </div>
            )}
            <p>
                Calculate familiar stats based on your total stats. Select a familiar and enter your total stats
                to see how the percentages translate to actual stat values. Add more familiars to compare them side by side.
            </p>
            <p>Thanks to Gylgymesh for coming up with the idea for this page!</p>

            <Box sx={{ mt: 3, mb: 4 }}>
                <TextField
                    fullWidth
                    type="number"
                    label="Total Stats"
                    value={totalStats}
                    onChange={handleTotalStatsChange}
                    inputProps={{ min: 1, max: 130000, step: 1000 }}
                    helperText="Shared across all familiars below"
                />
            </Box>

            <Grid container spacing={3} alignItems="stretch">
                {comparisons.map((comparison, index) => {
                    const stats = computeStats(comparison.familiar, totalStats, comparison.stableCount);
                    return (
                        <Grid key={comparison.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                            <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            Familiar {index + 1}
                                        </Typography>
                                        {comparisons.length > 1 && (
                                            <IconButton
                                                size="small"
                                                onClick={() => removeComparison(comparison.id)}
                                                aria-label="Remove familiar"
                                            >
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                    </Box>

                                    <Autocomplete
                                        options={familiarsData}
                                        getOptionLabel={(option) => option.name || ''}
                                        value={comparison.familiar}
                                        onChange={(_, newValue) => updateComparison(comparison.id, { familiar: newValue })}
                                        filterOptions={(options, { inputValue }) =>
                                            options.filter(option =>
                                                option.name.toLowerCase().includes(inputValue.toLowerCase())
                                            )
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Select Familiar"
                                                placeholder="Type to search..."
                                                size="small"
                                            />
                                        )}
                                        fullWidth
                                    />

                                    <Box sx={{ px: 1 }}>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Stable: +{comparison.stableCount - 1} ({(comparison.stableCount - 1) * 2}% bonus)
                                        </Typography>
                                        <Slider
                                            value={comparison.stableCount}
                                            onChange={(_, value) => updateComparison(comparison.id, { stableCount: value })}
                                            min={1}
                                            max={6}
                                            step={1}
                                            marks={SLIDER_MARKS}
                                            valueLabelDisplay="auto"
                                            valueLabelFormat={(value) => `+${value - 1}`}
                                            size="small"
                                        />
                                    </Box>

                                    {stats ? (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 'auto' }}>
                                            <StatRow label="STR" color="error" value={stats.strength} pct={comparison.familiar.strength} />
                                            <StatRow label="STA" color="success.main" value={stats.stamina} pct={comparison.familiar.stamina} />
                                            <StatRow label="AGI" color="info.main" value={stats.agility} pct={comparison.familiar.agility} />
                                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                                                Total: {(stats.strength + stats.stamina + stats.agility).toLocaleString()}
                                                {stats.stableBonus > 0 && ` (+${Math.round(stats.stableBonus).toLocaleString()} stable)`}
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto', fontStyle: 'italic' }}>
                                            Select a familiar to see stats
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            <Box sx={{ mt: 3 }}>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={addComparison}
                >
                    Add Familiar to Compare
                </Button>
            </Box>
        </Container>
    );
}

function StatRow({ label, color, value, pct }) {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 1.5,
            py: 0.75,
            borderRadius: 1,
            bgcolor: 'action.hover',
        }}>
            <Typography variant="body2" color={color} fontWeight="bold" sx={{ minWidth: 32 }}>
                {label}
            </Typography>
            <Box textAlign="right">
                <Typography variant="body1" fontWeight="medium">
                    {value.toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {pct}%
                </Typography>
            </Box>
        </Box>
    );
}
