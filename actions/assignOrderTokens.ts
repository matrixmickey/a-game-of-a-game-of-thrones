"use server";

import { HousePiece } from "@/types/HousePiece";

export default async function assignOrderTokens(areasContainingYourUnits: string[], orderTokens: HousePiece[]) {
    let areasContainingYourUnitsString = "";
    for (const area of areasContainingYourUnits) {
        areasContainingYourUnitsString += `${area}, `;
    }
    areasContainingYourUnitsString = areasContainingYourUnitsString.slice(0, -2);
    return {error: `You failed to assign an Order token to the following areas: ${areasContainingYourUnitsString}`};
}