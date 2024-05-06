import React, { useState } from "react";

export default function AdultChildrenInput({
  onAdultsChange,
  onChildrenChange,
}) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const increaseAdults = () => {
    const newAdults = adults + 1;
    setAdults(newAdults);
    onAdultsChange(newAdults);
  };

  const decreaseAdults = () => {
    if (adults > 1) {
      const newAdults = adults - 1;
      setAdults(newAdults);
      onAdultsChange(newAdults);
    }
  };

  const increaseChildren = () => {
    const newChildren = children + 1;
    setChildren(newChildren);
    onChildrenChange(newChildren);
  };

  const decreaseChildren = () => {
    if (children > 0) {
      const newChildren = children - 1;
      setChildren(newChildren);
      onChildrenChange(newChildren);
    }
  };

  return (
    <div className="relative border-2 border-gray-400 rounded">
      <input
        type="text"
        placeholder={`Adultos: ${adults}, Menores: ${children}`}
        onFocus={toggleDropdown}
        onBlur={toggleDropdown}
        readOnly
        className=" h-10 border rounded px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
      />
      {isOpen && (
        <div
          className="absolute z-10 top-12 right-0 bg-white border rounded-lg shadow-lg mr-10"
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        >
          <div className="p-2 m-2 w-full pr-8 shadow-xl">
            <div className="flex justify-between">
              <span className="p-3">Adultos</span>
              <div className="flex items-center space-x-2">
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    decreaseAdults();
                  }}
                  className="text-xl bold border border-gray-400 px-2 rounded-2xl"
                >
                  -
                </button>
                <span className="border border-gray-400 p-2 rounded">
                  {adults}
                </span>
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    increaseAdults();
                  }}
                  className="text-xl bold border border-gray-400 px-2 rounded-2xl"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="p-3">Menores </span>
              <div className="flex items-center space-x-2">
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    decreaseChildren();
                  }}
                  className="text-xl bold border border-gray-400 px-2 rounded-2xl"
                >
                  -
                </button>

                <span className="border border-gray-400 p-2 pr rounded">
                  {children}
                </span>
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    increaseChildren();
                  }}
                  className="text-xl bold border border-gray-400 px-2 rounded-2xl"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
