import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Slider from '@mui/material/Slider';
import familiarsData from '../../redux/familiars.json';

import styles from "./index.module.css";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function FamiliarCalc() {
    const [selectedFamiliar, setSelectedFamiliar] = useState(familiarsData[0]?.name || '');
    const [totalStats, setTotalStats] = useState(65000);
    const [stableCount, setStableCount] = useState(1);

    const handleFamiliarChange = (event) => {
        setSelectedFamiliar(event.target.value);
    };

    const handleTotalStatsChange = (event) => {
        const value = parseInt(event.target.value) || 0;
        setTotalStats(Math.max(0, Math.min(130000, value)));
    };

    const handleStableCountChange = (event, value) => {
        setStableCount(value);
    };

    let stats = null;
    if (selectedFamiliar && totalStats >= 0) {
        const familiar = familiarsData.find(f => f.name === selectedFamiliar);
        if (familiar) {
            // Base familiar stats are percentages of total stats
            const baseStrength = Math.round((totalStats * familiar.strength) / 100);
            const baseStamina = Math.round((totalStats * familiar.stamina) / 100);
            const baseAgility = Math.round((totalStats * familiar.agility) / 100);
            
            // Stable upgrades add 2% per level (max 10% at +5)
            const stableBonus = (stableCount - 1) * 0.02; // 0% at level 1, 8% at level 5
            const stableBonusStats = Math.round(totalStats * stableBonus);
            
            // Distribute stable bonus proportionally
            const totalPercentage = familiar.strength + familiar.stamina + familiar.agility;
            const strengthBonus = Math.round((stableBonusStats * familiar.strength) / totalPercentage);
            const staminaBonus = Math.round((stableBonusStats * familiar.stamina) / totalPercentage);
            const agilityBonus = Math.round((stableBonusStats * familiar.agility) / totalPercentage);

            stats = {
                strength: baseStrength + strengthBonus,
                stamina: baseStamina + staminaBonus,
                agility: baseAgility + agilityBonus,
                familiar,
                stableBonus: stableBonusStats
            };
        }
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <h2>Familiar Stats Calculator</h2>
            <div className={`${styles["bubble"]} ${styles["ext-link-risk"]}`}>
                <WarningAmberIcon />
                <div className={styles["bubble-message"]}>
                    Some of the stats on this page are broken as I'm still cleaning the data.
                </div>
                <WarningAmberIcon />
            </div> 
            <p>
                Calculate familiar stats based on your total stats. Select a familiar and enter your total stats 
                to see how the percentages translate to actual stat values.
            </p>
            <p>Thanks to Gylgymesh for coming up with the idea for this page!</p>

            <Box sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Select Familiar</InputLabel>
                            <Select
                                value={selectedFamiliar}
                                label="Select Familiar"
                                onChange={handleFamiliarChange}
                            >
                                {familiarsData.map((familiar) => (
                                    <MenuItem key={familiar.name} value={familiar.name}>
                                        {familiar.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    
                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Total Stats"
                            value={totalStats}
                            onChange={handleTotalStatsChange}
                            inputProps={{
                                min: 0,
                                max: 130000,
                                step: 1000
                            }}
                        />
                    </Grid>
                    
                    <Grid xs={12}>
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