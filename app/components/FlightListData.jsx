import React, { useState } from "react";

export default function FlightListData({ flights, handleFlightSelection }) {
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    handleFlightSelection(flight);
  };

  return (
    <div className="m-1 p-2 rounded ">
      {flights.map((flight, index) => (
        <div
          key={index}
          className={`m-5 border-b-2 border-neutral-400 ${
            selectedFlight === flight ? " text-black" : "bg-white"
          }`}
        >
          <div className="flex justify-between p-4">
            <div className="mx-2">{flight.departureTime}</div>
            <div className="mx-2">{flight.originAirport}</div>
            <div className="mx-2 text-neutral-600"><div>Duracion</div>{flight.duration}</div>
            <div className="mx-2">{flight.arrivalTime}</div>
            <div className="mx-2">{flight.destinationAirport}</div>
            <div className="mx-5">COP {flight.price}</div>
          </div>

          <div className="flex justify-end m-2">
            <button
              className={`btn-select m-2 bg-blue-500 text-white ${
                selectedFlight === flight
                  ? "btn-selected bg-white border-2 border-blue-500 text-blue-500"
                  : ""
              }`}
              onClick={() => handleSelectFlight(flight)}
            >
              {selectedFlight === flight ? "Seleccionado" : "Seleccionar"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
