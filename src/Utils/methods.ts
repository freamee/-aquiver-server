/** Checks if string is valid JSON or not. */
export function isValidJSON(value: string) {
    try {
        if (value) {
            JSON.parse(value);
            return true;
        } else return false;
    } catch (error) {
        return false;
    }
}
export function randomIndexFromArray(array: any[]) {
    return Math.floor(Math.random() * array.length);
}
