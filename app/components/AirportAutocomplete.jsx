import React, { useState } from "react";

function AirportAutocomplete({ value, onChange, airports }) {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const filteredSuggestions = airports.filter(
      (airport) =>
        airport.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        airport.CodeIATA.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    onChange(inputValue);
  };

  const handleSelect = (airportName) => {
    onChange(airportName);
    setSuggestions([]);
  };

  return (
    <div className="">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
      />
    
      <ul className="rounded-xl bg-gray-400 absolute">
        {suggestions.map((airport, index) => (
          <li className="p-2 hover:bg-gray-100" key={index} onClick={() => handleSelect(airport.name+" - "+airport.CodeIATA)}>
            {airport.name} - {airport.CodeIATA}
          </li>
        ))}
      </ul>
      </div>
  );
}

export default AirportAutocomplete;