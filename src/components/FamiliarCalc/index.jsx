import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Slider from '@mui/material/Slider';
import familiarsData from '../../redux/familiars.json';

import styles from "./index.module.css";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloseIcon from '@mui/icons-material/Close';

export default function FamiliarCalc() {
    const [selectedFamiliar, setSelectedFamiliar] = useState(familiarsData[0] || null);
    const [totalStats, setTotalStats] = useState(65000);
    const [stableCount, setStableCount] = useState(1);
    const [disclaimerVisible, setDisclaimerVisible] = useState(true);

    const handleFamiliarChange = (event, newValue) => {
        setSelectedFamiliar(newValue);
    };

    const handleTotalStatsChange = (event) => {
        const value = parseInt(event.target.value) || 1;
        setTotalStats(Math.max(1, Math.min(130000, value)));
    };

    const handleStableCountChange = (event, value) => {
        setStableCount(value);
    };

    const dismissDisclaimer = () => setDisclaimerVisible(false);

    let stats = null;
    if (selectedFamiliar && totalStats >= 1) {
        const familiar = selectedFamiliar;
        if (familiar) {
            // Base familiar stats are percentages of total stats
            const baseStrength = totalStats * (familiar.strength / 100);
            const baseStamina = totalStats * (familiar.stamina / 100);
            const baseAgility = totalStats * (familiar.agility / 100);
            
            // Stable upgrades add 2% per level (max 10% at +5)
            const stableBonus = (stableCount - 1) * 0.02; // 0% at level 1, 8% at level 5
            const stableBonusStats = totalStats * stableBonus;
            
            // Distribute stable bonus proportionally
            const totalPercentage = familiar.strength + familiar.stamina + familiar.agility;
            const strengthBonus = (stableBonusStats * familiar.strength)/ totalPercentage;
            const staminaBonus = (stableBonusStats * familiar.stamina) / totalPercentage;
            const agilityBonus = (stableBonusStats * familiar.agility) / totalPercentage;

            stats = {
                strength: Math.round(baseStrength + strengthBonus),
                stamina: Math.round(baseStamina + staminaBonus),
                agility: Math.round(baseAgility + agilityBonus),
                familiar,
                stableBonus: stableBonusStats
            };
        }
    }

    return (
        <Container key="famcalc" className={styles["outer-container"]} maxWidth="md">
            <h2>Familiar Stats Calculator</h2>
            {disclaimerVisible && (
                <div className={`${styles["bubble"]} ${styles["ext-link-risk"]}`}>
                    <WarningAmberIcon />
                    <div className={styles["bubble-message"]}>
                        Data was scraped from <a href="https://bit-heroes.fandom.com/wiki">the wiki</a> on 5 August 2025. Some stats are outdated.
                    </div>
                    <WarningAmberIcon />
                    <button 
                        onClick={dismissDisclaimer} 
                        className={styles["close-button"]}
                        aria-label="Close disclaimer"
                    >
                        <CloseIcon />
                    </button>
                </div>
            )} 
            <p>
                Calculate familiar stats based on your total stats. Select a familiar and enter your total stats 
                to see how the percentages translate to actual stat values.
            </p>
            <p>Thanks to Gylgymesh for coming up with the idea for this page!</p>

            <Box sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, sm: 12 }}>
                        <Autocomplete
                            options={familiarsData}
                            getOptionLabel={(option) => option.name || ''}
                            value={selectedFamiliar}
                            onChange={handleFamiliarChange}
                            filterOptions={(options, { inputValue }) => {
                                return options.filter(option =>
                                    option.name.toLowerCase().includes(inputValue.toLowerCase())
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Familiar"
                                    placeholder="Type to search familiars..."
                                />
                            )}
                            fullWidth
                        />
                    </Grid>
                    
                    <Grid size={{ xs: 12, sm: 12 }}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Total Stats"
                            value={totalStats}
                            onChange={handleTotalStatsChange}
                            inputProps={{
                                min: 1,
                                max: 130000,
                                step: 1000
                            }}
                        />
                    </Grid>
                    
                    <Grid size={{ xs: 10, sm: 10 }} offset={{ xs: 1, sm: 1 }}>
                        <span>Stable Count: +{stableCount - 1} ({(stableCount - 1) * 2}% bonus)</span>
                        <Slider
                            value={stableCount}
                            onChange={handleStableCountChange}
                            min={1}
                            max={6}
                            step={1}
                            marks={[
                                { value: 1, label: '+0' },
                                { value: 2, label: '+1' },
                                { value: 3, label: '+2' },
                                { value: 4, label: '+3' },
                                { value: 5, label: '+4' },
                                { value: 6, label: '+5' }
                            ]}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `+${value - 1}`}
                        />
                    </Grid>
                </Grid>

                {stats && (
                    <Box sx={{ mt: 4, p: 3, border: '1px solid #333', borderRadius: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            {stats.familiar.name} Stats
                        </Typography>
                        
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            Rarity: {stats.familiar.rarity}
                        </Typography>

                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid xs={12} sm={4}>
                                <Box sx={{ textAlign: 'center', p: 2, border: '1px solid #555', borderRadius: 1 }}>
                                    <Typography variant="h6" color="error">
                                        Strength
                                    </Typography>
                                    <Typography variant="h4">
                                        {stats.strength}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {stats.familiar.strength}% of total
                                    </Typography>
                                </Box>
                            </Grid>
                            
                            <Grid xs={12} sm={4}>
                                <Box sx={{ textAlign: 'center', p: 2, border: '1px solid #555', borderRadius: 1 }}>
                                    <Typography variant="h6" color="success.main">
                                        Stamina
                                    </Typography>
                                    <Typography variant="h4">
                                        {stats.stamina}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {stats.familiar.stamina}% of total
                                    </Typography>
                                </Box>
                            </Grid>
                            
                            <Grid xs={12} sm={4}>
                                <Box sx={{ textAlign: 'center', p: 2, border: '1px solid #555', borderRadius: 1 }}>
                                    <Typography variant="h6" color="info.main">
                                        Agility
                                    </Typography>
                                    <Typography variant="h4">
                                        {stats.agility}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {stats.familiar.agility}% of total
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            Total calculated: {stats.strength + stats.stamina + stats.agility} stats
                        </Typography>
                        
                        {stats.stableBonus > 0 && (
                            <Typography variant="body2" color="info.main" sx={{ mt: 1 }}>
                                Stable bonus: +{stats.stableBonus} stats ({(stableCount - 1) * 2}% of total)
                            </Typography>
                        )}
                    </Box>
                )}
            </Box>
        </Container>
    );
}