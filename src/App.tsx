import React, { useEffect, useState } from "react";
import "./App.css";
import { NewCar } from "./components/NewCar";
import { CarsTable } from "./components/CarsTable";
import { CarSelected } from "./components/CarSelected";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Car } from "./utils/types";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface CarsState {
  error: string;
  isLoading: boolean;
  cars: Array<Car>;
}

function App() {
  const [carsState, setCarsState] = useState<CarsState>({
    error: "",
    isLoading: false,
    cars: [],
  });
  const [carSelected, setCarSelected] = useState<Car>();

  useEffect(() => {
    setCarsState((state) => ({ ...state, isLoading: true }));
    fetch("http://localhost:8082/cars")
      .then((res) => res.json())
      .then(({ cars }) => setCarsState((state) => ({ ...state, cars })))
      .catch((error) => setCarsState((state) => ({ ...state, error })))
      .finally(() => setCarsState((state) => ({ ...state, isLoading: false })));
  }, []);

  const onSelect = (car: Car) => setCarSelected(car);
  const pushCar = (newCar: Car) =>
    setCarsState((state) => ({ ...state, cars: [...state.cars, newCar] }));

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="container">
        <div>
          <h1>Cars</h1>
          {carsState.isLoading ? (
            <CircularProgress />
          ) : (
            <CarsTable
              cars={carsState.cars}
              onSelect={onSelect}
              carSelected={carSelected}
            />
          )}
          <NewCar pushCar={pushCar} />
        </div>
        <div>
          <h1>Car Detail</h1>
          {carSelected ? (
            <CarSelected carSelected={carSelected} />
          ) : (
            <p>Select a car on table to see more details about it</p>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
