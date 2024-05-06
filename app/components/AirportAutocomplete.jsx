import React, { useState, useEffect, useRef } from "react";

function AirportAutocomplete({ value, onChange, airports }) {
  const [suggestions, setSuggestions] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

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
    <div ref={wrapperRef} className="border-2 border-gray-400 rounded">
      <div className="flex">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="rounded-md px-4 py-2 w-full h-10"
        />{" "}
      </div>

      {suggestions.length > 0 && (
        <ul className="rounded-xl absolute">
          {suggestions.map((airport, index) => (
            <li
              className="p-2 hover:bg-gray-300"
              key={index}
              onClick={() =>
                handleSelect(airport.name + " - " + airport.CodeIATA)
              }
            >
              {airport.name} - {airport.CodeIATA}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AirportAutocomplete;
