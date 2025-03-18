import { useState } from "react";
import { Select } from "react-select-ui";
import "./style.css";

type Plant = {
  id: number;
  name: string;
  type: string;
};

const options = [
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
  { id: 11, name: "Pineapple", type: "fruit" },
  { id: 12, name: "Blueberry", type: "fruit" },
  { id: 13, name: "Cranberry", type: "fruit" },
  { id: 14, name: "Lettuce", type: "vegetable" },
  { id: 15, name: "Cauliflower", type: "vegetable" },
  { id: 16, name: "Asparagus", type: "vegetable" },
  { id: 17, name: "Radish", type: "vegetable" },
  { id: 18, name: "Mango", type: "fruit" },
  { id: 19, name: "Papaya", type: "fruit" },
  { id: 20, name: "Raspberry", type: "fruit" },
  { id: 21, name: "Brussels Sprouts", type: "vegetable" },
  { id: 22, name: "Zucchini", type: "vegetable" },
  { id: 23, name: "Blackberry", type: "fruit" },
  { id: 24, name: "Fig", type: "fruit" },
  { id: 25, name: "Pomegranate", type: "fruit" },
  { id: 26, name: "Cucumber", type: "vegetable" },
  { id: 27, name: "Turnip", type: "vegetable" },
  { id: 28, name: "Grapefruit", type: "fruit" },
  { id: 29, name: "Pear", type: "fruit" },
  { id: 30, name: "Celery", type: "vegetable" },
];

const CategorizedValues = () => {
  const [value, setValue] = useState<Plant[]>([]);

  return (
    <Select
      value={value}
      defaultSelectOptions={options}
      isCategorized={true}
      categoryKey="type"
      recordsPerPage={10}
      onChange={setValue}
      isMultiValue={true}
      labelKey="name"
    />
  );
};

export default CategorizedValues;
