import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import styles from "./index.module.css";
import { calcIF, cleanVal, getEncounterIFForDisplay, getIFEquation, VerticalSpacing } from "./utils";

export default function StandardIFCalc() {
    const options = useSelector((state) => state.calc.options);

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
            rune1: cleanVal(formValues.rune1),
            rune2: cleanVal(formValues.rune2),
            guild: cleanVal(formValues.guild),
            consumable: cleanVal(formValues.consumable),
            dailyMult: cleanVal(formValues.dailyMult),
            adgor: cleanVal(formValues.adgor),
            encounter: cleanVal(formValues.encounter),
            
            // ternary is a hack for pvp if
            daily: (formValues.daily === "0-r" && formValues.encounter === "1-tix") ?
                100 : cleanVal(formValues.daily),
        };
        const result = calcIF(params);

        let r = `${result}%`;
        if (result > 3500) {
            r += " (exceeds 3500% cap)"
        }

        setOutput(r);
        setEquation(getIFEquation(params));
    }, [formValues]);

    return (
        
        <section id="standard-if-calc">
            <h2>Standard Item Find Calculator</h2>
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
                            {options.runes.options.map((v, i) => (
                                <MenuItem key={i} value={v.value}>{v.text}</MenuItem>
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
                            {options.runes.options.map((v, i) => (
                                <MenuItem key={i} value={v.value}>{v.text}</MenuItem>
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
                            {options.guild.options.map((v, i) => (
                                <MenuItem key={i} value={v.value}>{v.text}</MenuItem>
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
                            {options.consumables.groups["By Name"].map((v, i) => (
                                <MenuItem key={i} value={v.value}>{v.text}</MenuItem>
                            ))}

                            <ListSubheader key="by-amount">By Amount</ListSubheader>
                            {options.consumables.groups["By Amount"].map((v, i) => (
                                <MenuItem key={i} value={v.value}>{v.text}</MenuItem>
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
                            {options.daily.options.map((v, i) => (
                                <MenuItem key={i} value={v.value}>{v.text}</MenuItem>
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
                            <MenuItem key="daily-mult-1x" value={1}>1x</MenuItem>
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
                            {options.adgor.options.map((v, i) => (
                                <MenuItem key={i} value={v.value}>{v.text}</MenuItem>
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
                            {Object.keys(options.encounter.groups).map((k, i) => {
                                const items = options.encounter.groups[k].map((item, j) => (
                                    <MenuItem key={j} value={item.value}>{`${item.text} (IF: ${getEncounterIFForDisplay(item.value)}%)`}</MenuItem>
                                ));

                                return [
                                    <ListSubheader key={`${k}-${i}`}>{k}</ListSubheader>,
                                    ...items,
                                ];
                            })}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <p className={styles.results}>
                Your item find is:<br />
                <span className={styles.output}>{output}</span>
            </p>

            <p className={styles.equation}><strong>Equation:</strong> {equation}</p>
        </section>
    );
}
