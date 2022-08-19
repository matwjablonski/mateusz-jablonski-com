export const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const generateRandomNumbers = (min: number, max: number, expectedLength: number) => {
    const array = [];

    while (array.length < expectedLength) {
        const random = generateRandomNumber(min, max);
        if (!array.includes(random)) {
            array.push(random);
        }
    }

    return array;
}