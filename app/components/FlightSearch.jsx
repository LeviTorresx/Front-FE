import React, { useState, useEffect } from "react";
import AirportAutocomplete from "./AirportAutocomplete";
import dataFlight from "../dataFlight.json";
import FlightListData from "./FlightListData";
import AdultChildrenInput from "./AdultChildrenInput";
import Modal from "./Modal";
import { searchFlights } from "./FlightUtils";

function FlightSearch() {
  // Estado para almacenar los datos del formulario y la interfaz de usuario
  const [formData, setFormData] = useState({
    origin: "", // Aeropuerto de origen
    destination: "", // Aeropuerto de destino
    departureDate: "", // Fecha de salida
    returnDate: "", // Fecha de regreso (solo para vuelos de ida y vuelta)
    adults: 1, // Número de adultos
    children: 0, // Número de niños
    selectedOutboundFlight: null, // Vuelo de ida seleccionado
    selectedReturnFlight: null, // Vuelo de regreso seleccionado (solo para vuelos de ida y vuelta)
    isRoundTrip: true, // Indica si el usuario ha seleccionado vuelo de ida y vuelta
    showModal: false, // Indica si se debe mostrar el modal de confirmación
    showFlights: false, // Indica si se deben mostrar los vuelos disponibles
    availableFlights: [], // Lista de vuelos disponibles de ida
    availableFlightsRound: [], // Lista de vuelos disponibles de vuelta (solo para vuelos de ida y vuelta)
    airports: [], // Lista de aeropuertos para la autocompletación
    isOneWay: false, // Indica si el usuario ha seleccionado solo vuelo de ida
  });

  // Cargar los aeropuertos disponibles al montar el componente
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      airports: dataFlight.aeropuertos,
    }));
  }, []);

  // Cargar los vuelos disponibles al montar el componente
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      availableFlights: dataFlight.vuelos,
    }));
  }, []);

  // Función para buscar vuelos según los criterios seleccionados por el usuario
  const handleSearch = () => {
    const {
      availableFlights,
      origin,
      destination,
      departureDate,
      returnDate,
      isRoundTrip,
    } = formData;
  
    const { validFlightsOneWay, validFlightsRoundWay } = searchFlights(
      availableFlights,
      origin,
      destination,
      departureDate,
      returnDate
    );
  
    if (
      origin &&
      destination &&
      departureDate &&
      validFlightsOneWay.length > 0
    ) {
      setFormData((prevData) => ({
        ...prevData,
        availableFlights: validFlightsOneWay,
        availableFlightsRound: validFlightsRoundWay,
        showFlights: true,
        isOneWay: !isRoundTrip,
      }));
    } else {
      alert(
        "Por favor selecciona un origen, destino válidos y fechas válidas."
      );
    }
  };

  // Función para confirmar la selección y cerrar el modal
  const handleAccept = () => {
    console.log("Form Data:", formData); // Acción de aceptar, aquí se puede enviar el formulario
    setFormData((prevData) => ({
      ...prevData,
      showModal: false,
    }));
  };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
                name="isRoundTrip"
                value="true"
                checked={formData.isRoundTrip}
                onChange={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    isRoundTrip: true,
                  }))
                }
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
                name="isRoundTrip"
                value="false"
                checked={!formData.isRoundTrip}
                onChange={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    isRoundTrip: false,
                  }))
                }
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
              value={formData.origin}
              onChange={(value) =>
                setFormData((prevData) => ({ ...prevData, origin: value }))
              }
              airports={formData.airports}
            />
          </div>
          <div className="mx-2">
            <label className="block mb-2 label">Destino</label>
            <div className="z-20">
              <AirportAutocomplete
                value={formData.destination}
                onChange={(value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    destination: value,
                  }))
                }
                airports={formData.airports}
              />
            </div>
          </div>
          <div className="mx-2">
            <label className="block mb-2 label">Fecha de ida</label>
            <input
              type="date"
              value={formData.departureDate}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  departureDate: e.target.value,
                }))
              }
              className="border-2 border-gray-400 rounded px-4 py-2 w-full"
            />
          </div>
          <div className="mx-2">
            {formData.isRoundTrip && (
              <div className="mx-2">
                <label className="block mb-2 label">Fecha de vuelta</label>
                <input
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      returnDate: e.target.value,
                    }))
                  }
                  className="border-2 border-gray-400 rounded-md px-4 py-2 w-full"
                />
              </div>
            )}
          </div>
          <div className="pt-6">
            <AdultChildrenInput
              onAdultsChange={(value) =>
                setFormData((prevData) => ({ ...prevData, adults: value }))
              }
              onChildrenChange={(value) =>
                setFormData((prevData) => ({ ...prevData, children: value }))
              }
            />
          </div>

          <div className="mx-5 pt-4">
            <button className="btn-search" onClick={handleSearch}>
              Buscar
            </button>
          </div>
        </div>
      </div>
      {/* Modal para confirmar la selección */}
      {formData.showModal && (
        <Modal
          {...formData}
          onClose={() =>
            setFormData((prevData) => ({ ...prevData, showModal: false }))
          }
          onAccept={handleAccept}
        />
      )}

      {/* Mostrar lista de vuelos */}
      {formData.showFlights && (
        <div className="mt-8 m-4 p-2 rounded">
          {formData.isOneWay ? (
            // Mostrar lista de vuelos de ida
            <FlightListData
              flights={formData.availableFlights}
              handleFlightSelection={(flight) =>
                setFormData((prevData) => ({
                  ...prevData,
                  selectedOutboundFlight: flight,
                }))
              }
            />
          ) : (
            // Mostrar lista de vuelos de ida y vuelta
            <div>
              <h3 className="text-xl font-semibold mt-2">Vuelos de ida</h3>
              <FlightListData
                flights={formData.availableFlights}
                handleFlightSelection={(flight) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    selectedOutboundFlight: flight,
                  }))
                }
              />
              {formData.selectedOutboundFlight && (
                <div>
                  <h3 className="text-xl font-semibold mt-4">
                    Vuelos de vuelta
                  </h3>
                  <FlightListData
                    flights={formData.availableFlightsRound}
                    handleFlightSelection={(flight) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        selectedReturnFlight: flight,
                      }))
                    }
                  />
                </div>
              )}
            </div>
          )}
          {/* Botón para aceptar la selección y mostrar el modal */}
          <button
            onClick={() =>
              setFormData((prevData) => ({ ...prevData, showModal: true }))
            }
            className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
          >
            Acceptar
          </button>
        </div>
      )}
    </div>
  );
}

export default FlightSearch;
