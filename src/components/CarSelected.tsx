import React from "react";
import "./CarSelected.css";
import { Car } from "../utils/types";

interface CarSelectedProps {
  carSelected: Car;
}

export const CarSelected = ({ carSelected }: CarSelectedProps) => (
  <div className="car-detail">
    <h3>ID: {carSelected?.uuid}</h3>
    <h3>Make: {carSelected?.make}</h3>
    <h3>Model: {carSelected?.model}</h3>
    <h3>Package: {carSelected?.package}</h3>
    <h3>Color: {carSelected?.color}</h3>
    <h3>Year: {carSelected?.year}</h3>
    <h3>Category: {carSelected?.category}</h3>
    <h3>Mileage: {carSelected?.mileage}</h3>
    <h3>Price: {carSelected?.price}</h3>
  </div>
);
