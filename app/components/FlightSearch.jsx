import React, { useState, useEffect } from "react";
import AirportAutocomplete from "./AirportAutocomplete";
import dataFlight from "../dataFlight.json";
import FlightListData from "./FlightListData";

function FlightSearch() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
  const [tripType, setTripType] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showFlights, setShowFlights] = useState(false);
  const [availableFlights, setAvailableFlights] = useState([]);
  const [availableFlightsRound, setAvailableFlightRounds] = useState([]);
  const [airport, setAirports] = useState(false);
  const [oneWay, setOneway] = useState(false);

  useEffect(() => {
    setAirports(dataFlight.aeropuertos);
  }, []);

  useEffect(() => {
    setAvailableFlights(dataFlight.vuelos); // Establecer los vuelos disponibles desde el archivo JSON
  }, []);

  const handleSearch = () => {
    const validFlightsOneWay = dataFlight.vuelos.filter(
      (flight) =>
        flight.originAirport == origin.split(" - ")[1] &&
        flight.destinationAirport === destination.split(" - ")[1] &&
        new Date(departureDate) <= new Date(flight.departureTime)
    );

    const validFlightsRoundWay = dataFlight.vuelos.filter(
      (flight) =>
        flight.originAirport == destination.split(" - ")[1] &&
        flight.destinationAirport === origin.split(" - ")[1] &&
        new Date(returnDate) <= new Date(flight.departureTime)
    );

    if (
      origin &&
      destination &&
      departureDate &&
      validFlightsOneWay.length > 0
    ) {
      setAvailableFlights(validFlightsOneWay);
      setAvailableFlightRounds(validFlightsRoundWay);
      setShowFlights(true);
      setOneway(!tripType);
    } else {
      alert(
        "Por favor selecciona un origen, destino válidos y fechas validas."
      );
    }
  };

  return (
    <div>
      <div className="bg-sky-300 m-4 rounded-xl">
        <div className="flex justify-normal m-4">
          <h1 className="font-bold text-3xl m-4">Busqueda de vuelos</h1>
          <div className="flex justify-between items-center mb-2 bg-white rounded-xl m-2 p-2">
            <div className="mr-4 p-2 bg-sky-200 rounded-xl hover:bg-green-100">
              <input
                type="radio"
                id="roundTrip"
                name="tripType"
                value="roundTrip"
                checked={tripType}
                onChange={() => setTripType(true)}
              />
              <label htmlFor="roundTrip" className="ml-2">
                Round Trip
              </label>
            </div>
            <div className="bg-sky-200 p-2 rounded-xl hover:bg-green-100 ">
              <input
                type="radio"
                id="oneWay"
                name="tripType"
                value="oneWay"
                checked={!tripType}
                onChange={() => setTripType(false)}
              />
              <label htmlFor="oneWay" className="ml-2 ">
                One Way
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between p-4 m-5">
          <div className="mx-2 ">
            <label className="block mb-2 text-xl font-semibold">Origen:</label>
            <AirportAutocomplete
              value={origin}
              onChange={setOrigin}
              airports={airport}
            />
          </div>
          <div className="mx-2">
            <label className="block mb-2 text-xl font-semibold">Destino:</label>
            <div className="z-20">
              <AirportAutocomplete
                value={destination}
                onChange={setDestination}
                airports={airport}
              />
            </div>
          </div>
          <div className="mx-2">
            <label className="block mb-2 text-xl font-semibold">
              Departure Date:
            </label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mx-2">
            {tripType && (
              <div className="mx-2">
                <label className="block mb-2 text-xl font-semibold">
                  Return Date:
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
            )}
          </div>
          <div className="mx-1">
            <label className="block mb-2 text-xl font-semibold">Adults:</label>
            <input
              type="number"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              min={1}
              className="border border-gray-300 rounded-md px-4 py-2 w-20"
            />
          </div>
          <div className="mx-2">
            <label className="block mb-2 text-xl font-semibold">
              Children:
            </label>
            <input
              type="number"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              min={0}
              className="border border-gray-300 rounded-md px-4 py-2 w-20"
            />
          </div>
          <div>
            <button className="btn-search" onClick={handleSearch}>
              Buscar
            </button>
          </div>
        </div>
      </div>
      {showFlights && (
        <div className="mt-8 m-4 p-4 bg-sky-200 rounded-xl">
          <h2 className="text-2xl font-semibold">Flights:</h2>
          {oneWay ? (
            <FlightListData
              flights={availableFlights}
              handleFlightSelection={setSelectedOutboundFlight}
            />
          ) : (
            <div>
              <h3 className="text-xl font-semibold mt-4">Outbound Flights:</h3>
              <FlightListData
                flights={availableFlights}
                handleFlightSelection={setSelectedOutboundFlight}
              />
              {selectedOutboundFlight && (
                <div>
                  <h3 className="text-xl font-semibold mt-4">
                    Return Flights:
                  </h3>
                  <FlightListData
                    flights={availableFlightsRound}
                    handleFlightSelection={setSelectedReturnFlight}
                  />
                </div>
              )}
              ;
            </div>
          )}
        </div>
      )}
      ;
    </div>
  );
}
export default FlightSearch;
