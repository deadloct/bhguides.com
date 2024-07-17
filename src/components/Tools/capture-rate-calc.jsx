import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";

import styles from './index.module.css';
import { cleanVal, VerticalSpacing } from "./utils";

export default function CaptureRateCalc() {
    const encounterOptions = useSelector((state) => state.calc.options.encounterCapRate);

    const [output, setOutput] = useState("0%");
    const [infoCapRate, setInfoCapRate] = useState(0);
    const [encounterBonus, setEncounterBonus] = useState(cleanVal(encounterOptions.default));

    const infoCapRateRef = useRef(infoCapRate);
    const encounterBonusRef = useRef(encounterBonus);

    const handleCapRateChange = e => {
        let { value } = e.target;
    
        if (value.trim().length === 0) {
            value = 0;
        } else if (value.indexOf("%") >= 0) {
            const parts = value.split("%");
            if (parts.length > 0) {
                value = parts[0];
            }
        }

        setInfoCapRate(value);
        infoCapRateRef.current = value;
    };

    const handleEncounterChange = e => {
        const val = cleanVal(e.target.value);
        setEncounterBonus(cleanVal(e.target.value));
        encounterBonusRef.current = val;
    };

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            const output = (cleanVal(infoCapRateRef.current) + 100) * (cleanVal(encounterBonusRef.current));
            setOutput(`${output}%`);
        }, 100);

        return () => clearTimeout(timeoutID);
    });

    return (
        <section id="capture-rate-calc">
            <h2>Capture Rate Calculator</h2>

            <Box flexDirection="column">
                <FormControl fullWidth>
                    <TextField id="info-input"
                        name="info"
                        label="Info Screen Capture Rate"
                        type="number"
                        placeholder="i.e. 25"
                        onChange={handleCapRateChange}
                    />
                </FormControl>
            </Box>

            <Box flexDirection="column">
                <Box mt={VerticalSpacing}>
                    <FormControl fullWidth>
                        <InputLabel id="encounter-label">Encounter</InputLabel>
                        <Select
                            labelId="encounter-label"
                            id="encounter"
                            name="encounter"
                            defaultValue={encounterOptions.default}
                            label="Encounter"
                            onChange={handleEncounterChange}
                        >
                            {Object.keys(encounterOptions.groups).map((k, i) => {
                                const items = encounterOptions.groups[k].map((item, j) => (
                                    <MenuItem key={j} value={item.value}>{item.text}</MenuItem>
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
                Your capture rate is:<br />
                <span id="caprate-output" className={styles.output}>{output}</span>
            </p>
        </section>
    );
}
