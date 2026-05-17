import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import styles from "../ItemFind/index.module.css";
import {
    calcIF,
    getEncounterIFForDisplay,
    getIFEquation,
    getOptionValue,
    SardinexEventOverride,
    VerticalSpacing,
} from "../../utils/utils";

export default function ExperienceCalc() {
    const options = useSelector((state) => state.calc.options.experience);

    const [output, setOutput] = useState("0%");
    const [equation, setEquation] = useState("");
    const [formValues, setFormValues] = useState({
        rune1: options.runes.default,
        rune2: options.runes.default,
        guild: options.guild.default,
        consumable: options.consumables.default,
        daily: options.daily.default,
        dailyMult: 1,
        adgor: options.adgor.default,
        encounter: options.encounter.default,
    });

    const handleInputChange = e => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    useEffect(() => {
        const params = {
            rune1: getOptionValue(options.runes, formValues.rune1),
            rune2: getOptionValue(options.runes, formValues.rune2),
            guild: getOptionValue(options.guild, formValues.guild),
            consumable: getOptionValue(options.consumables, formValues.consumable),
            daily: getOptionValue(options.daily, formValues.daily),
            dailyMult: formValues.dailyMult,
            adgor: getOptionValue(options.adgor, formValues.adgor),
            encounter: getOptionValue(options.encounter, formValues.encounter),
        };
        const result = calcIF(params);

        setOutput(`${result}%`);
        setEquation(getIFEquation(params));
    }, [formValues]);

    return (

        <section id="experience-calc">
            <h2>Experience Calculator</h2>
            <Box flexDirection="column">
                <Box mt={VerticalSpacing}>
                    <FormControl fullWidth>
                        <InputLabel id="rune1-label">Minor Rune 1</InputLabel>
                        <Select
                            labelId="rune1-label"
                            id="rune1"
                            name="rune1"
                            defaultValue={options.runes.default}
                            label="Minor Rune 1"
                            onChange={handleInputChange}
                        >
                            {Object.entries(options.runes.options).map(([key, v]) => (
                                <MenuItem key={key} value={key}>{v.text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box mt={VerticalSpacing}>
                    <FormControl fullWidth>
                        <InputLabel id="rune2-label">Minor Rune 2</InputLabel>
                        <Select
                            labelId="rune2-label"
                            id="rune2"
                            name="rune2"
                            defaultValue={options.runes.default}
                            label="Minor Rune 2"
                            onChange={handleInputChange}
                        >
                            {Object.entries(options.runes.options).map(([key, v]) => (
                                <MenuItem key={key} value={key}>{v.text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box mt={VerticalSpacing}>
                    <FormControl fullWidth>
                        <InputLabel id="guild-label">Guild Bonus</InputLabel>
                        <Select
                            labelId="guild-label"
                            id="guild"
                            name="guild"
                            defaultValue={options.guild.default}
                            label="Guild Bonus"
                            onChange={handleInputChange}
                        >
                            {Object.entries(options.guild.options).map(([key, v]) => (
                                <MenuItem key={key} value={key}>{v.text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box mt={VerticalSpacing}>
                    <FormControl fullWidth>
                        <InputLabel id="consumable-label">Consumable</InputLabel>
                        <Select
                            labelId="consumable-label"
                            id="consumable"
                            name="consumable"
                            defaultValue={options.consumables.default}
                            label="Consumable"
                            onChange={handleInputChange}
                        >
                            <ListSubheader key="by-name">By Name</ListSubheader>
                            {Object.entries(options.consumables.groups["By Name"]).map(([key, v]) => (
                                <MenuItem key={key} value={key}>{v.text}</MenuItem>
                            ))}

                            <ListSubheader key="by-amount">By Amount</ListSubheader>
                            {Object.entries(options.consumables.groups["By Amount"]).map(([key, v]) => (
                                <MenuItem key={key} value={key}>{v.text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box mt={VerticalSpacing}>
                    <FormControl fullWidth>
                        <InputLabel id="daily-label">Day</InputLabel>
                        <Select
                            labelId="daily-label"
                            id="daily"
                            name="daily"
                            defaultValue={options.daily.default}
                            label="Day"
                            onChange={handleInputChange}
                        >
                            {Object.entries(options.daily.options).map(([key, v]) => (
                                <MenuItem key={key} value={key}>{v.text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box mt={VerticalSpacing}>
                    <FormControl fullWidth>
                        <InputLabel id="daily-mult-label">Daily Bonus Multiplier</InputLabel>
                        <Select
                            labelId="daily-mult-label"
                            id="dailyMult"
                            name="dailyMult"
                            defaultValue={1}
                            label="Daily Bonus Multiplier"
                            onChange={handleInputChange}
                        >
                            <MenuItem key="daily-mult-1x" value={1}>None</MenuItem>
                            <MenuItem key="daily-mult-override" value={SardinexEventOverride}>Sardinex Blanket {SardinexEventOverride}% Override</MenuItem>
                            <MenuItem key="daily-mult-2x" value={2}>2x</MenuItem>
                            <MenuItem key="daily-mult-3x" value={3}>3x</MenuItem>
                            <MenuItem key="daily-mult-4x" value={4}>4x</MenuItem>
                            <MenuItem key="daily-mult-5x" value={5}>5x</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box mt={VerticalSpacing}>
                    <FormControl fullWidth>
                        <InputLabel id="adgor-label">Adgor/Permagor</InputLabel>
                        <Select
                            labelId="adgor-label"
                            id="adgor"
                            name="adgor"
                            defaultValue={options.adgor.default}
                            label="Adgor/Permagor"
                            onChange={handleInputChange}
                        >
                            {Object.entries(options.adgor.options).map(([key, v]) => (
                                <MenuItem key={key} value={key}>{v.text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box mt={VerticalSpacing}>
                    <FormControl fullWidth>
                        <InputLabel id="encounter-label">Encounter</InputLabel>
                        <Select
                            labelId="encounter-label"
                            id="encounter"
                            name="encounter"
                            defaultValue={options.encounter.default}
                            label="Encounter"
                            onChange={handleInputChange}
                        >
                            {Object.entries(options.encounter.groups).map(([groupName, items]) => [
                                <ListSubheader key={groupName}>{groupName}</ListSubheader>,
                                ...Object.entries(items).map(([key, item]) => (
                                    <MenuItem key={key} value={key}>{`${item.text} (XP: ${getEncounterIFForDisplay(item.value)}%)`}</MenuItem>
                                )),
                            ])}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <p className={styles.results}>
                Your experience is:<br />
                <span className={styles.output}>{output}</span>
            </p>

            <p className={styles.equation}><strong>Equation:</strong> {equation}</p>
        </section>
    );
}
