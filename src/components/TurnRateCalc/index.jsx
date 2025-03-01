import React, { useEffect, useState } from "react";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';

import styles from "./index.module.css";
import TurnRateEqnSVG from './turn-rate-equation.svg?react';

const defaultValues = {
    power: 20000,
    agility: 20000,
    speed: 0,
};

const limits = {
    power: { min: 0, max: 120000 },
    agility: { min: 0, max: 120000 },
    speed: { min: 0, max: 125 },
};

export default function TurnRateCalc() {
    const [sliderValues, setSliderValues] = useState(defaultValues);
    const [inputDisplayValues, setInputDisplayValues] = useState(defaultValues);
    const [turnRate, setTurnRate] = useState(0);

    useEffect(() => {
        let p = sliderValues.power;
        let a = sliderValues.agility;
        let s = sliderValues.speed;
        let multiplier = 1 + (s / 100);
        let numerator = multiplier * (((a + p) / 2) ** 2);
        let rate = Math.floor(numerator / p);
        setTurnRate(isNaN(rate) ? 0 : rate);
    }, [sliderValues]);

    function limit(val, name) {
        if (val < limits[name].min) {
            return limits[name].min;
        }

        if (val > limits[name].max) {
            return limits[name].max;
        }

        return val;
    }

    function getSliderHandler(name) {
        return (e, value) => {
            setSliderValues({
                ...sliderValues,
                [name]: value,
            });

            setInputDisplayValues({
                ...inputDisplayValues,
                [name]: value,
            });
        };
    }

    function getInputHandler(name) {
        return e => {
            let v = e.target.value === "" ? limits[name].min : limit(parseFloat(e.target.value), name);

            setSliderValues({
                ...sliderValues,
                [name]: v,
            });

            setInputDisplayValues({
                ...inputDisplayValues,
                [name]: e.target.value, // must be same text as came in
            });
        };
    }

    function getBlurHandler(name) {
        return () => {
            setSliderValues({
                ...sliderValues,
                [name]: limit(sliderValues[name], name),
            });

            setInputDisplayValues({
                ...inputDisplayValues,
                [name]: limit(sliderValues[name], name), // Set to slider val
            });
        };
    };

    return (
        <Container key="turnratecalc" className={styles["outer-container"]} maxWidth="md">
            <h2>Turn Rate Calculator</h2>

            <div className={styles["calculator-wrapper"]}>
                <Grid container justify="center" direction="column">
                    <Grid>
                        <Grid container justifyContent="space-between" direction="row">
                            <label>Power</label>
                            <TextField
                                type="number"
                                variant="standard"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                    htmlInput: {
                                        step: 100,
                                        min: limits.power.min,
                                        max: limits.power.max,
                                    }
                                }}
                                style={{
                                    width: "65px",
                                }}
                                value={inputDisplayValues.power}
                                onChange={getInputHandler("power")}
                                onBlur={getBlurHandler("power")}
                            />
                        </Grid>
                        <Slider value={sliderValues.power} min={limits.power.min} max={limits.power.max} valueLabelDisplay="auto" onChange={getSliderHandler("power")} />
                    </Grid>
                    <Grid>
                        <Grid container justifyContent="space-between" direction="row">
                            <label>Agility</label>
                            <TextField
                                type="number"
                                variant="standard"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                    htmlInput: {
                                        step: 100,
                                        min: limits.agility.min,
                                        max: limits.agility.max,
                                    }
                                }}
                                style={{
                                    width: "65px",
                                }}
                                value={inputDisplayValues.agility}
                                onChange={getInputHandler("agility")}
                                onBlur={getBlurHandler("agility")}
                            />
                        </Grid>
                        <Slider value={sliderValues.agility} min={limits.agility.min} max={limits.agility.max} valueLabelDisplay="auto" onChange={getSliderHandler("agility")} />
                    </Grid>
                    <Grid>
                        <Grid container justifyContent="space-between" direction="row">
                            <label>Speed</label>
                            <TextField
                                type="number"
                                variant="standard"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                    htmlInput: {
                                        step: 1,
                                        min: limits.speed.min,
                                        max: limits.speed.max,
                                    },
                                }}
                                style={{
                                    width: "65px",
                                }}
                                value={inputDisplayValues.speed}
                                onChange={getInputHandler("speed")}
                                onBlur={getBlurHandler("speed")}
                            />
                        </Grid>
                        <Slider value={sliderValues.speed} min={limits.speed.min} max={limits.speed.max} step={0.1} valueLabelDisplay="auto" onChange={getSliderHandler("speed")} />
                    </Grid>
                </Grid>
            </div>

            <p className={styles.results}>
                Your turn rate is:<br />
                <span className={styles.output}>{turnRate}</span>
            </p>

            <h3>General Information</h3>
            <p>Contrary to popular belief, your turn rate isn't just agility!</p>
            <p>Quote from the <a href="https://bit-heroes.fandom.com/wiki/Mechanics">BH Wiki:</a></p>
            <blockquote cite="https://bit-heroes.fandom.com/wiki/Mechanics">
                As of 3/26/2017: Agility has been reworked. Turn rates are now based on a sum of power and agility.
                This will allow players to use different builds without losing any overall damage.
            </blockquote>

            <h3>Equation</h3>
            <div className={styles.equation}><TurnRateEqnSVG /></div>
            <dl>
                <dt>P</dt>
                <dd>Power</dd>
                <dt>A</dt>
                <dd>Agility</dd>
                <dt>SpeedBonus</dt>
                <dd>Speed Percentage</dd>
            </dl>

            <h3>What do I need to know?</h3>
            <p>
                The more power your character has, the slower they will be. Turn rate is inversely proportional to your
                power because it's the denominator in the equation above.
            </p>
            <p>
                Speed bonuses act as a multiplier for your turn rate. For example if there was one build with 0% speed
                and another with exactly the same gear but with +100% speed, the second would take twice as many turns.
            </p>

            <h3>Credits</h3>
            <p>
                Thanks to Chocomint for helping with the text below this calculator. Also thanks to ChubbyDaemon and
                the wiki crew for providing the information and equation that it was based on, along with the turn rate svg.
            </p>
        </Container>
    );
}