import React, { useState } from "react";
import Modal from "./Modal";
import FlightList from "./FlightList";

function FlightSearch() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
  const [tripType, setTripType] = useState("oneWay");
  const [showModal, setShowModal] = useState(false);
  const [showFlights, setShowFlights] = useState(false);

  const handleSearch = () => {
    if (
      origin &&
      destination &&
      departureDate &&
      (tripType === "oneWay" || (tripType === "roundTrip" && returnDate))
    ) {
      setShowFlights(true);
    } else {
      alert("Please fill in all required fields.");
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

  const availableOutboundFlights = [
    { id: 1, name: "Outbound Flight 1", price: 100 },
    { id: 2, name: "Outbound Flight 2", price: 150 },
    { id: 3, name: "Outbound Flight 3", price: 200 },
    { id: 4, name: "Outbound Flight 4", price: 120 },
    { id: 5, name: "Outbound Flight 5", price: 180 },
    { id: 6, name: "Outbound Flight 6", price: 220 },
  ];

  const availableReturnFlights = [
    { id: 7, name: "Return Flight 1", price: 100 },
    { id: 8, name: "Return Flight 2", price: 150 },
    { id: 9, name: "Return Flight 3", price: 200 },
    { id: 10, name: "Return Flight 4", price: 120 },
    { id: 11, name: "Return Flight 5", price: 180 },
    { id: 12, name: "Return Flight 6", price: 220 },
  ];

  return (
    <div>
      <div className="bg-sky-300 m-4 rounded-xl">
        <div className="flex justify-normal m-4">
          <h1 className="font-bold text-3 xl m-4">Busqueda de vuelos</h1>
          <div className="flex justify-between items-center mb-2 bg-white rounded-xl m-2 p-2">
            <div className="mr-4 bg- p-2 bg-sky-200 rounded-xl hover:bg-green-100">
              <input
                type="radio"
                id="oneWay"
                name="tripType"
                value="oneWay"
                checked={tripType === "oneWay"}
                onChange={() => setTripType("oneWay")}
              />
              <label htmlFor="oneWay" className="ml-2 ">
                One Way
              </label>
            </div>
            <div className="bg-sky-200 p-2 rounded-xl hover:bg-green-100">
              <input
                type="radio"
                id="roundTrip"
                name="tripType"
                value="roundTrip"
                checked={tripType === "roundTrip"}
                onChange={() => setTripType("roundTrip")}
              />
              <label htmlFor="roundTrip" className="ml-2">
                Round Trip
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between p-4 m-5">
          <div>
            <label className="block mb-2 text-xl font-semibold">Origin:</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-2 text-xl font-semibold">Destination:</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-2 text-xl font-semibold">Departure Date:</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div>
            {tripType === "roundTrip" && (
              <div>
                <label className="block mb-2 text-xl font-semibold">Return Date:</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block mb-2 text-xl font-semibold">Adults:</label>
            <input
              type="number"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              min={1}
              className="border border-gray-300 rounded-md px-4 py-2 w-20"
            />
          </div>
          <div>
            <label className="block mb-2 text-xl font-semibold">Children:</label>
            <input
              type="number"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              min={0}
              className="border border-gray-300 rounded-md px-4 py-2 w-20"
            />
          </div>

          <button className="btn-search" onClick={handleSearch}>
            Buscar
          </button>

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
        </div>
      </div>
      {showFlights && (
        <div className="mt-8 m-4 p-4 bg-sky-200 rounded-xl">
          <h2 className="text-2xl font-semibold">Flights:</h2>
          {tripType === "oneWay" && (
            <FlightList
              flights={availableOutboundFlights}
              handleFlightSelection={setSelectedOutboundFlight}
              isFlightSelected={(flight) => flight === selectedOutboundFlight}
            />
          )}
          {tripType === "roundTrip" && (
            <>
              <h3 className="text-xl font-semibold mt-4">Outbound Flights:</h3>
              <FlightList
                flights={availableOutboundFlights}
                handleFlightSelection={setSelectedOutboundFlight}
                isFlightSelected={(flight) => flight === selectedOutboundFlight}
              />
              <h3 className="text-xl font-semibold mt-4">Return Flights:</h3>
              <FlightList
                flights={availableReturnFlights}
                handleFlightSelection={setSelectedReturnFlight}
                isFlightSelected={(flight) => flight === selectedReturnFlight}
              />
            </>
          )}
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Accept
          </button>
        </div>
      )}
    </div>
  );
}

export default FlightSearch;
