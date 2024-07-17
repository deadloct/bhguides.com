import { calcIF } from './utils';

[
    {
        desc: "no bonuses",
        params: { rune1: 0, rune2: 0, guild: 0, consumable: 0, daily: 0, adgor: 0, encounter: 1, dailyMult: 1 },
        result: 100,
    },
    {
        desc: "bitgor",
        params: { rune1: 0, rune2: 0, guild: 0, consumable: 500, daily: 0, adgor: 0, encounter: 1, dailyMult: 1 },
        result: 600,
    },
    {
        desc: "bitgor in wb heroic",
        params: { rune1: 0, rune2: 0, guild: 0, consumable: 500, daily: 0, adgor: 0, encounter: 1.5, dailyMult: 1 },
        result: 900,
    },
    {
        desc: "max known bonuses",
        params: { rune1: 37.5, rune2: 37.5, guild: 13, consumable: 1200, daily: 75, adgor: 50, encounter: 5, dailyMult: 3 },
        result: 8315,
    },
].forEach(t => {
    it(t.desc, () => {
        expect(calcIF(t.params)).toEqual(t.result);
    });
});
