import React, { useState, useRef, useEffect } from 'react';
import { attributes } from "./common";

const Filter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAttribute, setSelectedAttribute] = useState(null);
    const [operations, setOperations] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleAttributeSelect = (attribute) => {
        setSelectedAttribute(attribute);
        setInputValue(attribute);
        setIsOpen(false);

        const defaultOperations = ['=', '!=', 'IN', 'NOT_IN', 'CONTAINS'];
        setOperations(defaultOperations);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setIsOpen(true);
        setSelectedAttribute(null);
    };

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target) && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredAttributes = attributes.filter(attribute =>
        attribute.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className="ml-20 my-40">
            <div className='mt-5 w-48'>
                {selectedAttribute && (
                    <div className="z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-md">
                        <p className="px-4 py-2">{`Selected Attribute: ${selectedAttribute}`}</p>
                    </div>
                )}
            </div>
            <div className="mt-2">
                <input
                    type="text"
                    placeholder={`Search Filter: select options from suggested values, for IN/NOT IN operators-press "Enter" after selecting response`}
                    className="w-3/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    onClick={toggleDropdown}
                    onChange={handleInputChange}
                    value={inputValue}
                    ref={inputRef}
                />
                {isOpen && (
                    <div className="w-3/4 z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-md h-44 overflow-y-auto mb-2"
                        ref={dropdownRef}
                        style={{ minWidth: inputRef.current.offsetWidth }}
                    >
                        <ul>
                            {selectedAttribute ? (
                                operations.map((operation, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        {`${selectedAttribute} ${operation}`}
                                    </li>
                                ))
                            ) : (
                                filteredAttributes.map((attribute, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleAttributeSelect(attribute)}
                                    >
                                        {attribute}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                )}
            </div>          
        </div>
    );
};

export default Filter;
