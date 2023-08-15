import React from "react";
import "./CarSelected.css";
import { Car } from "../utils/types";

interface CarSelectedProps {
  carSelected: Car;
}

export const CarSelected = ({ carSelected }: CarSelectedProps) => (
  <div className="car-detail">
    <div>
      <h4 className="small">ID:</h4> <p>{carSelected?.uuid}</p>
    </div>
    <div>
      <h4 className="medium">Make:</h4> <p>{carSelected?.make}</p>
    </div>
    <div>
      <h4 className="medium">Model:</h4> <p>{carSelected?.model}</p>
    </div>
    <div>
      <h4 className="medium">Package:</h4> <p>{carSelected?.package}</p>
    </div>
    <div>
      <h4 className="medium">Color:</h4> <p>{carSelected?.color}</p>
    </div>
    <div>
      <h4 className="small">Year:</h4> <p>{carSelected?.year}</p>
    </div>
    <div>
      <h4 className="medium">Category:</h4> <p>{carSelected?.category}</p>
    </div>
    <div>
      <h4 className="medium">Mileage:</h4> <p>{carSelected?.mileage}</p>
    </div>
    <div>
      <h4 className="medium">Price:</h4> <p>{carSelected?.price}</p>
    </div>
  </div>
);
