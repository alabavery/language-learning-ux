export const getBookendsOfContext = (transcript, startOfStr) => {
    let beginningFinder = startOfStr;
    while (beginningFinder > 0) {
        beginningFinder -= 1;
        if (transcript[beginningFinder] === '.') {
            break;
        }
    }
    let endFinder = startOfStr;
    while (endFinder < transcript.length) {
        endFinder += 1;
        if (transcript[endFinder] === '.') {
            break;
        }
    }
    return {
        start: beginningFinder,
        end: endFinder,
    };
};