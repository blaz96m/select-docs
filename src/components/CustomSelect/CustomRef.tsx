import React, { useRef, useState } from "react";
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

const CustomSelectRef = () => {
  const [value, setValue] = useState<Plant[]>([]);

  const customSelectInputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    const inputNode = customSelectInputRef.current;
    if (inputNode) {
      inputNode.focus();
    }
  };

  return (
    <React.Fragment>
      <button onClick={focusInput}>Focus Input</button>
      <Select
        value={value}
        isMultiValue={true}
        defaultSelectOptions={options}
        onChange={setValue}
        labelKey="name"
        refs={{ inputRef: customSelectInputRef }}
      />
    </React.Fragment>
  );
};

export default CustomSelectRef;
