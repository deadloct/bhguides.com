const UnknownDate = "Unknown Date";

const Months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];

export const DefaultYear = "9999";

export function FormatVideoTime(str) {
    if (!str) {
        return UnknownDate;
    }

    const parts = str.split("-");
    switch (parts.length) {
        case 3:
            return `${Months[parseInt(parts[1])-1]} ${parseInt(parts[2])}, ${parts[0]}`;
        case 2:
            return `${Months[parseInt(parts[1])-1]} ${parts[0]}`;
        default:
            return str;
    }
}

export function YearFromDate(str) {
    if (str.length === 0) {
        return DefaultYear;
    }

    const parts = str.split("-");

    // Something after 1/1 so conversion to UTC doesn't put it in the prev year.
    return new Date(`${parts[0]}-01-05`).getFullYear() || DefaultYear;
}
