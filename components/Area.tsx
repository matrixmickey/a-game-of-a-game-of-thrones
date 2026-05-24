"use client";

import { HousePiece } from "@/types/HousePiece";
import Piece from "./Piece";
import MovablePiece from "./MovablePiece";
import { Dispatch, SetStateAction } from "react";

export default function Area({name, top, left, width, height, housePieces, yourHouse, containsYourUnits, orderTokens, setOrderTokens, nameOfSelectedPiece, setNameOfSelectedPiece} : {name: string, top: number, left: number, width: number, height: number, housePieces: HousePiece[], yourHouse: string | undefined, containsYourUnits: boolean, orderTokens: HousePiece[], setOrderTokens: Dispatch<SetStateAction<HousePiece[]>>, nameOfSelectedPiece: string, setNameOfSelectedPiece: Dispatch<SetStateAction<string>>}) {
    const nameOfOrderToken = orderTokens.find(orderToken => orderToken.area === name)?.type?.slice(12);

    function setOrderToken() {
        if (!yourHouse) return;
        setOrderTokens(orderTokens.filter(orderToken => orderToken.area !== name));
        const orderTokenType = `order-token-${nameOfSelectedPiece}`;
        const orderToken = orderTokens.find(orderToken => orderToken.house === yourHouse && orderToken.type === orderTokenType);
        if (orderToken) {
            setOrderTokens(orderTokens.map(orderToken => orderToken.house === yourHouse && orderToken.type === orderTokenType ? {...orderToken, area: name} : orderToken))
        } else {
            setOrderTokens([...orderTokens, {house: yourHouse, type: orderTokenType, area: name}]);
        }
        setNameOfSelectedPiece("");
    }

    return (
        <div
            className={`area${containsYourUnits ? " contains-your-units" : ""}`}
            style={{top: `${top}%`, left: `${left}%`, width: `${width}%`, height: `${height}%`}}
            onDragOver={containsYourUnits ? ev => ev.preventDefault() : undefined}
            onDrop={containsYourUnits ?  ev => {
                ev.preventDefault();
                setOrderToken();
            } : undefined}
            onClick={containsYourUnits ? ev => {
                setOrderToken();
            } : undefined}
        >
            {housePieces.map((housePiece, index) => {
                const id = `house-piece-top-${top}-left-${left}-index-${index}`;
                return <Piece key={index} src={`/images/house-pieces/${housePiece.type}-${housePiece.house}.png`} alt={id} />
            })}
            {nameOfOrderToken && <MovablePiece piece={<Piece src={`/images/order-tokens/${nameOfOrderToken}.png`} alt={nameOfOrderToken} />} name={nameOfOrderToken} nameOfSelectedPiece={nameOfSelectedPiece} setNameOfSelectedPiece={setNameOfSelectedPiece} />}
        </div>
    )
}