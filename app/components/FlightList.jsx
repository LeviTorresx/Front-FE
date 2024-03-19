import React, { useState } from "react";

function FlightList({ flights, handleFlightSelection, isFlightSelected }) {
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleSelectFlight = (flightName) => {
    setSelectedFlight(flightName);
    handleFlightSelection(flightName);
  };

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 bg-gray-200 p-6 rounded-xl">
      {flights.map((flight) => (
        <li
          key={flight.id}
          className={`${
            selectedFlight === flight.name ? "bg-red-200" : "bg-white"
          } shadow-md rounded-md p-4`}
        >
          <div>
            <span className="font-bold">{flight.name}</span>
            <span className="text-gray-500"> - Price: ${flight.price}</span>
          </div>
          <button
            onClick={() => handleSelectFlight(flight.name)}
            disabled={isFlightSelected(flight.name)}
            className={`mt-2 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md ${
              isFlightSelected(flight.name)
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            {isFlightSelected(flight.name) ? "Selected" : "Select"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default FlightList;
