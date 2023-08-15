import React, { useEffect, useState } from "react";
import "./NewCar.css";
import { Car } from "../utils/types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";

const emptyNewCar: Car = {
  uuid: "",
  make: "",
  model: "",
  package: "",
  color: "",
  year: 2020,
  category: "",
  mileage: 0,
  price: 0,
};

interface addCarState {
  error: string;
  form: boolean;
  isLoading: boolean;
}

interface NewCarProps {
  pushCar: (newCar: Car) => void;
}

export const NewCar = ({ pushCar }: NewCarProps) => {
  const [newCar, setNewCar] = useState<Car>(emptyNewCar);
  const [addCarState, setAddCarState] = useState<addCarState>({
    error: "",
    form: false,
    isLoading: false,
  });

  useEffect(() => {
    return () => setNewCar(emptyNewCar);
  }, [addCarState.form]);

  const handleUuidChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewCar((state) => ({ ...state, uuid: e.target.value }));
  const handleMakeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewCar((state) => ({ ...state, make: e.target.value }));
  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewCar((state) => ({ ...state, model: e.target.value }));
  const handlePackageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewCar((state) => ({ ...state, package: e.target.value }));
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewCar((state) => ({ ...state, color: e.target.value }));
  const handleYearSelect = (e: SelectChangeEvent) =>
    setNewCar((state) => ({ ...state, year: parseInt(e.target.value) }));
  const handleCategorySelect = (e: SelectChangeEvent) =>
    setNewCar((state) => ({ ...state, category: e.target.value }));
  const handleMileageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewCar((state) => ({ ...state, mileage: parseInt(e.target.value) }));
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewCar((state) => ({ ...state, price: parseInt(e.target.value) }));

  const submit = () => {
    setAddCarState((state) => ({ ...state, isLoading: true }));
    fetch("http://localhost:8082/cars", {
      method: "POST",
      body: JSON.stringify(newCar),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => pushCar(newCar))
      .catch((error) => setAddCarState((state) => ({ ...state, error })))
      .finally(() =>
        setAddCarState((state) => ({ ...state, form: false, isLoading: false }))
      );
  };

  const cancel = () => setAddCarState((state) => ({ ...state, form: false }));

  return addCarState.form ? (
    <div className="add-car-container">
      <h2>New Car Form</h2>
      <div className="form">
        <TextField
          id="standard-basic"
          label="ID"
          variant="standard"
          className="small"
          inputProps={{ maxLength: 7 }}
          value={newCar.uuid}
          onChange={handleUuidChange}
        />
        <TextField
          id="standard-basic"
          label="Make"
          variant="standard"
          className="medium"
          value={newCar.make}
          onChange={handleMakeChange}
        />
        <TextField
          id="standard-basic"
          label="Model"
          variant="standard"
          className="medium"
          value={newCar.model}
          onChange={handleModelChange}
        />
        <TextField
          id="standard-basic"
          label="Package"
          variant="standard"
          className="medium"
          value={newCar.package}
          onChange={handlePackageChange}
        />
        <TextField
          id="standard-basic"
          label="Color"
          variant="standard"
          className="medium"
          value={newCar.color}
          onChange={handleColorChange}
        />
        <TextField
          id="standard-basic"
          label="mileage"
          value={newCar.mileage}
          onChange={handleMileageChange}
          variant="standard"
          className="medium"
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">mi</InputAdornment>,
          }}
        />
        <TextField
          id="standard-basic"
          label="Price (Cents)"
          value={newCar.price}
          onChange={handlePriceChange}
          variant="standard"
          className="medium"
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">¢</InputAdornment>,
          }}
        />
        <FormControl className="large">
          <InputLabel id="year-select">Year</InputLabel>
          <Select
            labelId="year-select"
            value={`${newCar.year}`}
            label="Year"
            onChange={handleYearSelect}
          >
            <MenuItem value={"2020"}>2020</MenuItem>
            <MenuItem value={"2021"}>2021</MenuItem>
            <MenuItem value={"2022"}>2022</MenuItem>
            <MenuItem value={"2023"}>2023</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="large">
          <InputLabel id="category-select">Category</InputLabel>
          <Select
            labelId="category-select"
            value={newCar.category}
            label="Category"
            onChange={handleCategorySelect}
          >
            <MenuItem value={"Hatchback"}>Hatchback</MenuItem>
            <MenuItem value={"Truck"}>Truck</MenuItem>
            <MenuItem value={"Sedan"}>Sedan</MenuItem>
            <MenuItem value={"SUV"}>SUV</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="button-container">
        <Button variant="outlined" onClick={cancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={submit}>
          Submit Car
        </Button>
      </div>
    </div>
  ) : (
    <div className="button-container">
      <Button
        variant="contained"
        onClick={() => setAddCarState((state) => ({ ...state, form: true }))}
      >
        Add Car
      </Button>
    </div>
  );
};
