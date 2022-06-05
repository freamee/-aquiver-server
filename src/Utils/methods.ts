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

/** Checks if cfx user exist or not. (source) */
export function cfxPlayerExist(source: string | number) {
    return GetPlayerName(source as string) != null;
}

/** Get random index from array. */
export function randomIndexFromArray(array: any[]) {
    return Math.floor(Math.random() * array.length);
}

/** Get random value from array. */
export function randomFromArray<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)];
}

/** Async waiter for loops or any other await. */
export function Wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
