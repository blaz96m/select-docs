import React, { useRef, useState } from "react";

import "./style.css";
import { Select } from "select-ui";

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

const InputSelect = () => {
  const [value, setValue] = useState<Plant[]>([]);
  const [useDebounce, setUseDebounce] = useState(false);

  const customInputRef = useRef(null);

  return (
    <React.Fragment>
      <div className="input-group">
        <span>Debounce Input Update</span>
        <input
          type="checkbox"
          checked={useDebounce}
          onChange={() => {
            customInputRef.current.focus();
            setUseDebounce((oldState) => !oldState);
          }}
        />
      </div>
      <Select
        value={value}
        isMultiValue={true}
        debounceInputUpdate={useDebounce}
        disableCloseOnOutsideClick={true}
        refs={{ inputRef: customInputRef }}
        defaultSelectOptions={options}
        onChange={setValue}
        labelKey="name"
        hasInput={true}
      />
    </React.Fragment>
  );
};

export default InputSelect;
