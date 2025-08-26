import { expect, test } from 'vitest'

// Natural/alphanumeric sorting function that handles numbers within strings correctly
const naturalSort = (a, b) => {
    return a.localeCompare(b, undefined, { 
        numeric: true, 
        sensitivity: 'base' 
    });
};

[
    {
        desc: "natural sort: basic numeric ordering",
        input: ["Item 10", "Item 2", "Item 1"],
        expected: ["Item 1", "Item 2", "Item 10"],
    },
    {
        desc: "natural sort: tier familiars ordering",
        input: ["Tier 10 Familiars", "Tier 1 and 2 Familiars", "Tier 3 Familiars", "Tier 21 Familiars"],
        expected: ["Tier 1 and 2 Familiars", "Tier 3 Familiars", "Tier 10 Familiars", "Tier 21 Familiars"],
    },
    {
        desc: "natural sort: mixed content with numbers",
        input: ["Chapter 100", "Chapter 2", "Chapter 10", "Chapter 1"],
        expected: ["Chapter 1", "Chapter 2", "Chapter 10", "Chapter 100"],
    },
    {
        desc: "natural sort: alphabetical content unchanged",
        input: ["Zebra", "Apple", "Banana"],
        expected: ["Apple", "Banana", "Zebra"],
    },
].forEach(t => {
    test(t.desc, () => {
        const result = [...t.input].sort(naturalSort);
        expect(result).toEqual(t.expected);
    });
});