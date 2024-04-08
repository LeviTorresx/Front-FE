import React from "react";

export default function FlightListData({
  flights,
  handleFlightSelection,
  isFlightSelected,
}) {
  return (
    <div className="m-5 p-4 bg-gray-300 rounded-xl">
      {flights.map((flight, index) => (
        <div key={index} className="m-5 p-5 bg-white rounded-xl">
          <div className="flex justify-between p-8">
            <div className="mx-2">{flight.departureTime}</div>
            <div className="mx-2">{flight.originAirport}</div>  
            <div className="mx-2">{flight.duration}</div>
            <div className="mx-2">{flight.arrivalTime}</div>
            <div className="mx-2">{flight.destinationAirport}</div>
          </div>
          <div className="flex justify-end mx-5">
            {" "}
            Price: COP {flight.price}
          </div>
          <div className="flex justify-end m-2">
            <button className="btn-search m-2">Seleccionar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
