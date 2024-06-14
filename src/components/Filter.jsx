import React, { useState, useRef, useEffect } from 'react';
import { attributes } from "./common";

const Filter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filterState, setFilterState] = useState({
        operations: [],
        inputValue: ""
    });
    const [wholeData, setWholeData] = useState([]);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const [selectedValueObj, setSelectedValueObj] = useState({});
    const [typedValue, setTypedValue] = useState("");
    const [thirdStep, setThirdStep] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleAttributeSelect = (attribute) => {
        console.log('attribute', attribute)
        setSelectedValueObj({ firstValue: attribute });
        if (!filterState.operations.length) {
            setFilterState({
                operations: ['=', '!=', 'IN', 'NOT_IN', 'CONTAINS'],
                inputValue: ""
            });
        }
    };

    const handleOperationSelect = (operation) => {
        setSelectedValueObj({ ...selectedValueObj, secondValue: operation });
        setFilterState({
            operations: [],
            inputValue: ""
        });
        setTypedValue("");
        setThirdStep(true);
        setIsOpen(false);
        inputRef.current.focus();
    };
    const handleRandomValueSelect = (value) => {
        const newData = {
            firstValue: selectedValueObj?.firstValue,
            secondValue: selectedValueObj?.secondValue,
            thirdValue: value
        };
        setWholeData([...wholeData, newData]);
        setFilterState({
            operations: [],
            inputValue: ""
        });
        setTypedValue("");
        setThirdStep(false);
        setIsOpen(false);
    }

    const handleInputChange = (event) => {
        const value = event.target.value;
        setTypedValue(value);
        setFilterState(prevState => ({
            ...prevState,
            inputValue: value
        }));
        setIsOpen(true);
    };


    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target) &&
            dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
        attribute.toLowerCase().includes(filterState.inputValue.toLowerCase())
    );

    

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-8">Query Filter Builder</h1>
            <div className="w-80">
                <input
                    type="text"
                    placeholder={`Search Filter: select options from suggested values, for IN/NOT IN operators-press "Enter" after selecting response`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    onClick={toggleDropdown}
                    onChange={handleInputChange}
                    value={filterState.inputValue}
                    ref={inputRef}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                />
                {thirdStep && typedValue?.length > 0 && (
                    <div
                        className="mt-2 bg-white border border-gray-300 rounded-md shadow-md h-44 overflow-y-auto mb-2"
                        ref={dropdownRef}
                        style={{ minWidth: inputRef.current ? inputRef.current.offsetWidth : 'auto' }}
                        role="listbox"
                    >
                        <ul>
                            <li
                                key={"1"}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleRandomValueSelect(typedValue)}
                                role="option"
                            >
                                {typedValue}
                            </li>
                        </ul>
                    </div>
                )}
                {isOpen && !thirdStep && (
                    <div
                        className="mt-2 bg-white border border-gray-300 rounded-md shadow-md h-44 overflow-y-auto mb-2"
                        ref={dropdownRef}
                        style={{ minWidth: inputRef.current ? inputRef.current.offsetWidth : 'auto' }}
                        role="listbox"
                    >
                        <ul>
                            {filterState.operations.length > 0 ? (
                                filterState.operations.map((operation, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleOperationSelect(operation)}
                                        role="option"
                                    >
                                        {`${selectedValueObj?.firstValue} ${operation}`}
                                    </li>
                                ))
                            ) : (
                                filteredAttributes.map((attribute, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleAttributeSelect(attribute)}
                                        role="option"
                                    >
                                        {attribute}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                )}
            </div>
            <div className="mt-4">
                {wholeData?.length > 0 && (
                    <div>
                        {wholeData?.map((data, index) => (
                            <div key={index} className="items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 my-4">
                                {`${data.firstValue} - ${data.secondValue} - ${data.thirdValue}`}
                                <button
                                    type="button"
                                    className="ml-2 text-gray-500 hover:text-gray-700"
                                    onClick={() => {
                                        setWholeData(prevState => prevState.filter((_, i) => i !== index));
                                    }}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filter;
