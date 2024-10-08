
export const VerticalSpacing = 3;

export const SardinexEventOverride = 50;

export function calcIF(vals) {
    const daily = vals.dailyMult === SardinexEventOverride ? vals.dailyMult : vals.daily * vals.dailyMult;
    const total = 100 +
        vals.rune1 +
        vals.rune2 +
        vals.guild +
        vals.consumable +
        vals.adgor +
        daily;
    return total * vals.encounter;
}

export function getIFEquation(vals) {
    const daily = vals.dailyMult === SardinexEventOverride ?
        `eventOverride:(${SardinexEventOverride})` :
        `daily*event-multiplier:(${vals.daily}*${vals.dailyMult})`;
    return `(base:100 + rune:${vals.rune1} + rune:${vals.rune2} + guild:${vals.guild} + consumable:${vals.consumable} + adgor:${vals.adgor} + ${daily}) * (1 + encounter:${vals.encounter-1})`;
}

export function cleanVal(val) {
    if (typeof val === "number") {
        return val;
    }

    let actual = val;

    // Support vals like 1-raid-2, where 1 is the val and the rest is just there
    // to make option values unique.
    if (typeof val === "string") {
        const parts = val.split("-");
        actual = parts[0];
    }

    return Number.parseFloat(actual);
}

export function getEncounterIFForDisplay(val) {
    return (cleanVal(val)-1)*100;
}