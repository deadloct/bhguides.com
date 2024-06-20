import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";

import styles from "./index.module.css";
import { cleanVal, getEncounterIFForDisplay, VerticalSpacing } from "./utils";

export default function SimpleIFCalc() {
    const options = useSelector((state) => state.calc.options);
    const [output, setOutput] = useState("0%");
    const [infoIF, setInfoIF] = useState(0);
    const [encounterBonus, setEncounterBonus] = useState(cleanVal(options.encounter.default));

    const infoIFRef = useRef(infoIF);
    const encounterBonusRef = useRef(encounterBonus);

    const handleIFChange = e => {
        let { value } = e.target;
    
        if (value.trim().length === 0) {
            value = 0;
        } else if (value.indexOf("%") >= 0) {
            const parts = value.split("%");
            if (parts.length > 0) {
                value = parts[0];
            }
        }

        setInfoIF(value);
        infoIFRef.current = value;
    };

    const handleEncounterChange = e => {
        const val = cleanVal(e.target.value);
        setEncounterBonus(cleanVal(e.target.value));
        encounterBonusRef.current = val;
    };

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            const result = (cleanVal(infoIFRef.current) + 100) * encounterBonusRef.current;
            let r = `${result}%`;
            if (result > 3500) {
                r += " (exceeds 3500% cap)"
            }
            setOutput(r);
        }, 100);

        return () => clearTimeout(timeoutID);
    }, [infoIF, encounterBonus]);

    return (
        <section id="simple-if-calc">
            <h2>Simple Item Find Calculator</h2>

            <Box flexDirection="column">
                <FormControl fullWidth>
                    <TextField id="info-input"
                        name="info"
                        label="Info Screen Item Find"
                        type="number"
                        placeholder="i.e. 500"
                        onChange={handleIFChange}
                    />
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
                        onChange={handleEncounterChange}
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

            <p className={styles.results}>
                Your item find is:<br />
                <span id="simple-output" className={styles.output}>{output}</span>
            </p>
        </section>
    );
}
