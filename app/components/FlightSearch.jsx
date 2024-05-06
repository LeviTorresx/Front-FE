import React, { useState, useEffect } from "react";
import AirportAutocomplete from "./AirportAutocomplete";
import dataFlight from "../dataFlight.json";
import FlightListData from "./FlightListData";
import AdultChildrenInput from "./AdultChildrenInput";

import Modal from "./Modal";

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

  const handleAccept = () => {
    console.log("Origin:", origin);
    console.log("Destination:", destination);
    console.log("Departure Date:", departureDate);
    console.log("Return Date:", returnDate);
    console.log("Adults:", adults);
    console.log("Children:", children);
    console.log("Selected Outbound Flight:", selectedOutboundFlight);
    console.log("Selected Return Flight:", selectedReturnFlight);
    setShowModal(false);
  };

  return (
    <div>
      <div className="m-4 rounded">
        <div className="flex justify-normal m-4">
          <h1 className="font-semibold text-3xl m-5 pt-2">Vuelos</h1>
          <div className="flex justify-between mb-2 rounded-xl m-2 p-2">
            <div className="mr-4 p-2 rounded-xl">
              <input
                type="radio"
                id="roundTrip"
                name="tripType"
                value="roundTrip"
                checked={tripType}
                onChange={() => setTripType(true)}
                className="r-boton"
              />
              <label htmlFor="roundTrip" className="ml-2 w-full radio-custom">
                IDA Y VUELTA
              </label>
            </div>
            <div className="p-2 rounded-xl ">
              <input
                type="radio"
                id="oneWay"
                name="tripType"
                value="oneWay"
                checked={!tripType}
                onChange={() => setTripType(false)}
                className="r-boton"
              />
              <label htmlFor="oneWay" className="ml-2 w-100 radio-custom">
                SOLO IDA
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between p-4 m-5">
          <div className="mx-2 relative ">
            <label className="block mb-2 label">Origen</label>
            <AirportAutocomplete
              value={origin}
              onChange={setOrigin}
              airports={airport}
            />
          </div>
          <div className="mx-2">
            <label className="block mb-2 label">Destino</label>
            <div className="z-20">
              <AirportAutocomplete
                value={destination}
                onChange={setDestination}
                airports={airport}
              />
            </div>
          </div>
          <div className="mx-2">
            <label className="block mb-2 label">Fecha de ida</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="border-2 border-gray-400 rounded px-4 py-2 w-full"
            />
          </div>
          <div className="mx-2">
            {tripType && (
              <div className="mx-2">
                <label className="block mb-2 label">Fecha de vuelta</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="border-2 border-gray-400 rounded-md px-4 py-2 w-full"
                />
              </div>
            )}
          </div>
          <div className="pt-6">
            <AdultChildrenInput
              onAdultsChange={setAdults}
              onChildrenChange={setChildren}
            />
          </div>

          <div className="mx-5 pt-4">
            <button className="btn-search" onClick={handleSearch}>
              Buscar
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          origin={origin}
          destination={destination}
          departureDate={departureDate}
          returnDate={returnDate}
          adults={adults}
          children={children}
          selectedOutboundFlight={selectedOutboundFlight}
          selectedReturnFlight={selectedReturnFlight}
          onClose={() => setShowModal(false)}
          onAccept={handleAccept}
        />
      )}

      {showFlights && (
        <div className="mt-8 m-4 p-2 rounded">
          {oneWay ? (
            <FlightListData
              flights={availableFlights}
              handleFlightSelection={setSelectedOutboundFlight}
            />
          ) : (
            <div>
              <h3 className="text-xl font-semibold mt-2">Vuelos de ida</h3>
              <FlightListData
                flights={availableFlights}
                handleFlightSelection={setSelectedOutboundFlight}
              />
              {selectedOutboundFlight && (
                <div>
                  <h3 className="text-xl font-semibold mt-4">
                    Vuelos de vuelta
                  </h3>
                  <FlightListData
                    flights={availableFlightsRound}
                    handleFlightSelection={setSelectedReturnFlight}
                  />

                  
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
          >
            Accept
          </button>
        </div>
      )}
    </div>
  );
}
export default FlightSearch;
