import React from "react";
import "./CarsTable.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Car } from "../utils/types";

interface CarsTableProps {
  cars: Array<Car>;
  onSelect: (car: Car) => void;
  carSelected: Car | undefined;
}

export const CarsTable = ({ cars, onSelect, carSelected }: CarsTableProps) => (
  <TableContainer component={Paper} className="table-container">
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Make</TableCell>
          <TableCell>Model</TableCell>
          <TableCell>Year</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cars.map((car, i) => (
          <TableRow
            key={i}
            className={car.uuid === carSelected?.uuid ? "selected" : ""}
          >
            <TableCell onClick={() => onSelect(car)}>{car.uuid}</TableCell>
            <TableCell onClick={() => onSelect(car)}>{car.make}</TableCell>
            <TableCell onClick={() => onSelect(car)}>{car.model}</TableCell>
            <TableCell onClick={() => onSelect(car)}>{car.year}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
