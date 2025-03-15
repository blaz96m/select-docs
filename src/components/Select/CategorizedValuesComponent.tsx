import { useState } from "react";
import { Select } from "select-ui";
import "./style.css";

type Plant = {
  id: number;
  name: string;
  type: string;
};

const options = [
  { id: 1, name: "Orange", type: "fruits" },
  { id: 2, name: "Lemon", type: "fruits" },
  { id: 3, name: "Banana", type: "fruits" },
  { id: 4, name: "Cherry", type: "fruits" },
  { id: 5, name: "Peach", type: "fruits" },
  { id: 6, name: "Onion", type: "vegetables" },
  { id: 7, name: "Potato", type: "vegetables" },
  { id: 8, name: "Broccoli", type: "vegetables" },
  { id: 9, name: "Carrot", type: "vegetables" },
  { id: 10, name: "Spinach", type: "vegetables" },
];

const CategorizedValues = () => {
  const [value, setValue] = useState<Plant[]>([]);

  return (
    <Select
      value={value}
      defaultSelectOptions={options}
      isCategorized={true}
      categoryKey="type"
      onChange={setValue}
      isMultiValue={true}
      labelKey="name"
    />
  );
};

export default CategorizedValues;
