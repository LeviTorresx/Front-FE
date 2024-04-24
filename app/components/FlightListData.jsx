import React, { useState } from "react";

export default function FlightListData({ flights, handleFlightSelection }) {
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    handleFlightSelection(flight);
  };

  return (
    <div className="m-1 p-2 bg-gray-300 rounded">
      {flights.map((flight, index) => (
        <div key={index} className={`m-5 p-5 rounded-xl ${selectedFlight === flight ? 'bg-violet-300 text-white' : 'bg-white'}`}>
          <div className="flex justify-between p-4">
            <div className="mx-2">{flight.departureTime}</div>
            <div className="mx-2">{flight.originAirport}</div>
            <div className="mx-2">{flight.duration}</div>
            <div className="mx-2">{flight.arrivalTime}</div>
            <div className="mx-2">{flight.destinationAirport}</div>
          </div>
          <div className="flex justify-end mx-5">
            Price: COP {flight.price}
          </div>
          <div className="flex justify-end m-2">
            <button className={`btn-search m-2 ${selectedFlight === flight ? 'bg-gray-400 cursor-not-allowed' : ''}`} onClick={() => handleSelectFlight(flight)} disabled={selectedFlight === flight}>
              {selectedFlight === flight ? 'Selected' : 'Select'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
