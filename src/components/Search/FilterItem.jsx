import React, { useState } from 'react';

const attributes = ['attribute1', 'attribute2', 'attribute3'];
const operations = ['equals', 'contains', 'starts with', 'ends with'];

const FilterItem = ({ index, filter, updateFilter, removeFilter }) => {
    const [step, setStep] = useState(0);

    const handleAttributeChange = (e) => {
        updateFilter(index, { ...filter, attribute: e.target.value });
        setStep(1);
    };

    const handleOperationChange = (e) => {
        updateFilter(index, { ...filter, operation: e.target.value });
        setStep(2);
    };

    const handleValueChange = (e) => {
        updateFilter(index, { ...filter, value: e.target.value });
    };

    return (
        <div className="flex items-center space-x-2 mb-2">
            {step === 0 && (
                <select
                    onChange={handleAttributeChange}
                    value={filter.attribute}
                    className="px-2 py-1 border rounded"
                >
                    <option value="">Select Attribute</option>
                    {attributes.map(attr => <option key={attr} value={attr}>{attr}</option>)}
                </select>
            )}
            {step === 1 && (
                <select
                    onChange={handleOperationChange}
                    value={filter.operation}
                    className="px-2 py-1 border rounded"
                >
                    <option value="">Select Operation</option>
                    {operations.map(op => <option key={op} value={op}>{op}</option>)}
                </select>
            )}
            {step === 2 && (
                <input
                    type="text"
                    value={filter.value}
                    onChange={handleValueChange}
                    placeholder="Enter value"
                    className="px-2 py-1 border rounded"
                />
            )}
            <button
                onClick={() => removeFilter(index)}
                className="px-2 py-1 bg-red-500 text-white rounded"
            >
                X
            </button>
        </div>
    );
};

export default FilterItem;
