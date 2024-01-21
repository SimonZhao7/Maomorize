const nextInterval = {
    0: 1,
    1: 3,
    3: 7,
    7: 16,
    16: 30,
}

export const getNextInterval = (curInterval) => {
    if (curInterval in nextInterval) return nextInterval[curInterval];
    return curInterval * 2;
}