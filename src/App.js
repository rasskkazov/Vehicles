import "./App.scss";
import VehicleCard from "./components/VehicleCard.jsx";
import SelectedVehicle from "./components/SelectedVehicleSection.jsx";
import MySelect from "./components/MySelect.jsx";

import React, { useEffect, useState } from "react";
function App() {
    const [vehiclesData, setVehiclesData] = useState();
    const [reservedData, setReservedData] = useState();
    const [currentVehicle, setCurrentVehicle] = useState();

    const [levels, setLevels] = useState([]);
    const [nations, setNations] = useState([]);
    const [types, setTypes] = useState([]);

    const [selectedLevelFilter, setSelectedLevelFilter] = useState("all");
    const [selectedNationFilter, setSelectedNationFilter] = useState("all");
    const [selectedTypeFilter, setSelectedTypeFilter] = useState("all");
    function resetFilters() {
        setVehiclesData(reservedData);
        setSelectedLevelFilter("all");
        setSelectedNationFilter("all");
        setSelectedTypeFilter("all");
    }

    useEffect(() => {
        getGraphQLVehiclesData()
            .then((res) => {
                return res.json();
            })
            .then((rowData) => {
                const data = rowData.data.vehicles;
                setVehiclesData(data);
                setReservedData(data);
                setCurrentVehicle(data[0]);

                function getUniqueValues(vehicleTargetProperty) {
                    const uniqueValues = data.reduce(
                        (uniqueValues, vehicle) => {
                            if (
                                !uniqueValues.includes(
                                    getProperty(vehicle, vehicleTargetProperty)
                                )
                            ) {
                                return [
                                    ...uniqueValues,
                                    getProperty(vehicle, vehicleTargetProperty),
                                ];
                            }
                            return uniqueValues;
                        },
                        []
                    );
                    return uniqueValues.sort();
                }
                setNations(getUniqueValues("nation.title"));
                setTypes(getUniqueValues("type.title"));
                setLevels(
                    getUniqueValues("level")
                        .sort((a, b) => a - b)
                        .map((num) => num.toString())
                );
            });
    }, []);

    useEffect(() => {
        if (!reservedData) {
            return;
        }
        const filteredData = reservedData.filter((vehicle) => {
            if (
                (selectedLevelFilter === "all" ||
                    vehicle.level.toString() === selectedLevelFilter) &&
                (selectedNationFilter === "all" ||
                    vehicle.nation.title === selectedNationFilter) &&
                (selectedTypeFilter === "all" ||
                    vehicle.type.title === selectedTypeFilter)
            ) {
                return true;
            } else {
                return false;
            }
        });
        setVehiclesData(filteredData);
    }, [selectedLevelFilter, selectedNationFilter, selectedTypeFilter]);

    return (
        <div className="App">
            {vehiclesData ? (
                <div className="container">
                    <header>Мир кораблей</header>
                    <main>
                        {currentVehicle && (
                            <div className="vehicle-details">
                                <SelectedVehicle vehicle={currentVehicle} />
                            </div>
                        )}
                        {vehiclesData && (
                            <div className="vehicle-select">
                                <div className="sorting">
                                    <MySelect
                                        options={levels.map((level) => ({
                                            name: level,
                                            value: level,
                                        }))}
                                        defaultValue="Уровень"
                                        cbOnChange={setSelectedLevelFilter}
                                        value={selectedLevelFilter}
                                    />
                                    <MySelect
                                        options={nations.map((nation) => ({
                                            name: nation,
                                            value: nation,
                                        }))}
                                        defaultValue={"Нация"}
                                        cbOnChange={setSelectedNationFilter}
                                        value={selectedNationFilter}
                                    />
                                    <MySelect
                                        options={types.map((type) => ({
                                            name: type,
                                            value: type,
                                        }))}
                                        defaultValue={"Класс"}
                                        cbOnChange={setSelectedTypeFilter}
                                        value={selectedTypeFilter}
                                    />
                                    <button onClick={resetFilters}>
                                        {" "}
                                        Reset
                                    </button>
                                </div>
                                <div className="vehicles-bar">
                                    <ul>
                                        {vehiclesData.map((vehicle, index) => (
                                            <li
                                                key={index}
                                                onClick={() =>
                                                    setCurrentVehicle(vehicle)
                                                }
                                                className={
                                                    currentVehicle === vehicle
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                <VehicleCard
                                                    vehicle={vehicle}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default App;

function getGraphQLVehiclesData() {
    const query = `
        query {
            vehicles {
              title
              description
              icons {
                large
                medium
              }
              level
              type {
                name
                  title
                icons {
                  default
                }
              }
              nation {
                name
                title
                color
                icons {
                  small
                  medium
                  large
                }
              }
            }
          }`;

    const resp = fetch("https://vortex.korabli.su/api/graphql/glossary/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ query }),
    });
    return resp;
}

function getProperty(obj, property) {
    const properties = property.split(".");
    const result = properties.reduce((acc, current) => {
        if (acc && acc.hasOwnProperty(current)) {
            return acc[current];
        } else {
            return undefined;
        }
    }, obj);
    return result;
}
