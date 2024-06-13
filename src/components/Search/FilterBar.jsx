import React, { useState } from 'react';
import FilterItem from './FilterItem';

const FilterBar = () => {
    const [filters, setFilters] = useState([]);

    const addFilter = () => {
        setFilters([...filters, { attribute: '', operation: '', value: '' }]);
    };

    const updateFilter = (index, updatedFilter) => {
        const newFilters = [...filters];
        newFilters[index] = updatedFilter;
        setFilters(newFilters);
    };

    const removeFilter = (index) => {
        setFilters(filters.filter((_, i) => i !== index));
    };

    return (
        <div className="p-4">
            {filters.map((filter, index) => (
                <FilterItem
                    key={index}
                    index={index}
                    filter={filter}
                    updateFilter={updateFilter}
                    removeFilter={removeFilter}
                />
            ))}
            <button
                onClick={addFilter}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Add Filter
            </button>
        </div>
    );
};

export default FilterBar;
