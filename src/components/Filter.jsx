import React, { useState, useRef, useEffect } from 'react';

const Filter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAttribute, setSelectedAttribute] = useState(null);
    const [operations, setOperations] = useState([]); // State to manage operations
    const attributes = ['container_id', 'severity_number', 'body_id']; // Hardcoded list of attributes
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleAttributeSelect = (attribute) => {
        setSelectedAttribute(attribute);
        setIsOpen(false);

        // Update operations based on the selected attribute
        switch (attribute) {
            case 'container_id':
            case 'severity_number':
                setOperations(['=', '!=', 'IN', 'NOT_IN', 'CONTAINS']);
                break;
            case 'body_id':
                setOperations(['=', '!=', 'IN', 'NOT_IN', 'CONTAINS']);
                break;
            default:
                setOperations([]);
        }
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

    return (
        <div className="ml-20">
            <div className="relative my-40">
                <input
                    type="text"
                    placeholder={`Search Filter: select options from suggested values, for IN/NOT IN operators-press "Enter" after selecting response`}
                    className="w-3/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    onClick={toggleDropdown}
                    ref={inputRef}
                />
                {isOpen && (
                    <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-md"
                        ref={dropdownRef}
                        style={{ minWidth: inputRef.current.offsetWidth }}
                    >
                        <ul>
                            {/* Display operations if an attribute is selected */}
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
                                /* Display attributes if no attribute is selected */
                                attributes.map((attribute, index) => (
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
            <div className='mt-5'>
                {selectedAttribute && (
                    <div className="absolute z-10 mt-2  bg-white border border-gray-300 rounded-md shadow-md">
                        <p className="px-4 py-2">{`Selected Attribute: ${selectedAttribute}`}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filter;
