import { Colour } from '../app/types';
import convert from 'color-convert';
const colours: Colour[] = require('../app/colours.json');

async function findClosestColour(targetHex: string): Promise<{ single: Colour, pair: [Colour, Colour] }> {
    const targetLab = convert.hex.lab(targetHex);

    let closestColour: Colour = colours[0];
    let closestColours: [Colour, Colour] = [colours[0], colours[1]];
    let smallestSingleDistance = Infinity;
    let smallestPairDistance = Infinity;

    for (let i = 0; i < colours.length; i++) {
        const distance = calculateDistance(targetLab, convert.rgb.lab([colours[i].R, colours[i].G, colours[i].B]));

        if (distance < smallestSingleDistance) {
            smallestSingleDistance = distance;
            closestColour = colours[i];
        }

        for (let j = i + 1; j < colours.length; j++) {
            const combinedLab = averageLab([colours[i].R, colours[i].G, colours[i].B], [colours[j].R, colours[j].G, colours[j].B]);
            const pairDistance = calculateDistance(targetLab, combinedLab);

            if (pairDistance < smallestPairDistance) {
                smallestPairDistance = pairDistance;
                closestColours = [colours[i], colours[j]];
            }
        }
    }

    return { single: closestColour, pair: closestColours };
}

export default findClosestColour;

function averageLab(rgb1: [number, number, number], rgb2: [number, number, number]): [number, number, number] {
    const lab1 = convert.rgb.lab(rgb1);
    const lab2 = convert.rgb.lab(rgb2);

    return [
        (lab1[0] + lab2[0]) / 2,
        (lab1[1] + lab2[1]) / 2,
        (lab1[2] + lab2[2]) / 2
    ];
}

function calculateDistance(lab1: [number, number, number], lab2: [number, number, number]): number {
    return Math.sqrt(
        Math.pow(lab1[0] - lab2[0], 2) +
        Math.pow(lab1[1] - lab2[1], 2) +
        Math.pow(lab1[2] - lab2[2], 2)
    );
}