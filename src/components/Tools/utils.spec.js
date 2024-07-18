import { expect, test } from 'vitest'
import { calcIF } from './utils';

[
    {
        desc: "calc if: no bonuses",
        params: { rune1: 0, rune2: 0, guild: 0, consumable: 0, daily: 0, adgor: 0, encounter: 1, dailyMult: 1 },
        result: 100,
    },
    {
        desc: "calc if: bitgor",
        params: { rune1: 0, rune2: 0, guild: 0, consumable: 500, daily: 0, adgor: 0, encounter: 1, dailyMult: 1 },
        result: 600,
    },
    {
        desc: "calc if: bitgor in wb heroic",
        params: { rune1: 0, rune2: 0, guild: 0, consumable: 500, daily: 0, adgor: 0, encounter: 1.5, dailyMult: 1 },
        result: 900,
    },
    {
        desc: "calc if: max known bonuses",
        params: { rune1: 37.5, rune2: 37.5, guild: 13, consumable: 1200, daily: 75, adgor: 50, encounter: 5, dailyMult: 3 },
        result: 8315,
    },
    {
        // Same as prev but with 50% override
        desc: "calc if: sardinex override",
        params: { rune1: 37.5, rune2: 37.5, guild: 13, consumable: 1200, daily: 75, adgor: 50, encounter: 5, dailyMult: 50 },
        result: 7440,
    },
].forEach(t => {
    test(t.desc, () => {
        expect(calcIF(t.params)).toEqual(t.result);
    });
});
