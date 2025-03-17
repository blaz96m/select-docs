import React, { useCallback, useRef, useState } from "react";

import "./style.css";
import { Select } from "react-select-ui";

type Plant = {
  id: number;
  name: string;
  type: string;
};

const options: Plant[] = [
  { id: 1, name: "Orange", type: "fruit" },
  { id: 2, name: "Lemon", type: "fruit" },
  { id: 3, name: "Banana", type: "fruit" },
  { id: 4, name: "Cherry", type: "fruit" },
  { id: 5, name: "Peach", type: "fruit" },
  { id: 6, name: "Onion", type: "vegetable" },
  { id: 7, name: "Potato", type: "vegetable" },
  { id: 8, name: "Broccoli", type: "vegetable" },
  { id: 9, name: "Carrot", type: "vegetable" },
  { id: 10, name: "Spinach", type: "vegetable" },
];

const FilterSelect = () => {
  const [value, setValue] = useState([]);
  const [filterBy, setFilterBy] = useState("");
  const [useSort, setUseSort] = useState(false);

  const customFilter = useCallback(
    (option: Plant) => {
      if (filterBy) {
        return option.type === filterBy;
      }
      return true;
    },
    [filterBy]
  );

  const customInputRef = useRef(null);

  const toggleFilterValue = (targetValue: string) => {
    filterBy === targetValue ? setFilterBy("") : setFilterBy(targetValue);
    customInputRef.current.focus();
  };

  const sortByName = useCallback(
    (selectOptions: Plant[]) => {
      customInputRef.current.focus();
      return [...selectOptions].sort((a, b) => (a.name > b.name ? 1 : -1));
    },

    []
  );

  const isFruitFilter = filterBy === "fruit";
  const isVegFilter = filterBy === "vegetable";

  return (
    <React.Fragment>
      <div className="filter-group">
        <div className="filter-item">
          <span>Filter by Fruit</span>
          <input
            type="checkbox"
            checked={isFruitFilter}
            onChange={() => toggleFilterValue("fruit")}
          />
        </div>
        <div className="filter-item">
          <span>Filter by Vegetables</span>
          <input
            type="checkbox"
            checked={isVegFilter}
            onChange={() => toggleFilterValue("vegetable")}
          />
        </div>
        <div className="filter-item">
          <span>Sort A-Z</span>
          <input
            type="checkbox"
            checked={useSort}
            onChange={() => setUseSort((prevValue) => !prevValue)}
          />
        </div>
      </div>
      <Select
        value={value}
        isMultiValue={true}
        defaultSelectOptions={options}
        disableCloseOnOutsideClick={true}
        refs={{ inputRef: customInputRef }}
        onChange={setValue}
        sortFunction={useSort ? sortByName : undefined}
        optionFilter={customFilter}
        labelKey="name"
      />
    </React.Fragment>
  );
};

export default FilterSelect;
