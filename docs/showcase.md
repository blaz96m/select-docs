---
id: showcase
title: Basic Functionality
---

import {
SingleValueComponent,
CategorizedValues,
MultiValue,
InputComponent,
FilterSelect,
SelectPaging
} from "@site/src/components/Select";
import {CodeToggle} from "@site/src/components/Other";

In this section we will cover the base functionality of the component, mostly focusing on its value and options states

### Value

The value of the Select component holds an array of either a single element or multiple elements. By default the value array will hold only one value, but that can be easily changed via the `isMulti` prop.

Here are the default behaviours for both the single and multi value components.

| **Behaviour**                    | **Single Value Select**               | **Multi Value Select**                |
| -------------------------------- | ------------------------------------- | ------------------------------------- |
| Close dropdown on select         | <div className="center-icon">✅</div> | <div className="center-icon">❌</div> |
| Clear input on select            | <div className="center-icon">✅</div> | <div className="center-icon">❌</div> |
| Will get cleared on input change | <div className="center-icon">✅</div> | <div className="center-icon">❌</div> |

#### Single Value {#single-value}
<SingleValueComponent />
<CodeToggle>
    ```jsx
    import { useState } from "react";

import "./style.css";
import { Select } from "react-select-ui";

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
];

const SingleValue = () => {
const [value, setValue] = useState([]);

return (
<Select
      value={value}
      defaultSelectOptions={options}
      onChange={setValue}
      labelKey="name"
      hasInput={false}
    />
);
};

export default SingleValue;

    ```
    </CodeToggle>

#### Multi Value {#multi-value}

<MultiValue />
    <CodeToggle>
    ```jsx

import { useState } from "react";
import "./style.css";
import { Select } from "react-select-ui";

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
];

const MultiValue = () => {
const [value, setValue] = useState([]);

return (
<Select
      value={value}
      isMultiValue={true}
      defaultSelectOptions={options}
      onChange={setValue}
      labelKey="name"
      hasInput={false}
    />
);
};

export default MultiValue;

    ```
      </CodeToggle>

## Options

The options of the select list can be filtered by the input value of the component if the `hasInput` prop is set to true. Additionaly they can be filtered by a custom `optionFilter` prop and sorted with a `sortFunction` prop.

We will showcase these functionalities in the following examples.

#### Select Input Filter {#input-select}

<InputComponent />
    <CodeToggle>
    ```jsx

import React, { useState } from "react";
import "./style.css";
import { Select } from "react-select-ui";

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
];

const InputSelect = () => {
const [value, setValue] = useState([]);
const [useDebounce, setUseDebounce] = useState(false);

return (
<React.Fragment>

<div className="input-group">
<span>Debounce Input Update</span>
<input
type="checkbox"
checked={useDebounce}
onChange={() => setUseDebounce((oldState) => !oldState)}
/>
</div>
<Select
        value={value}
        isMultiValue={true}
        debounceInputUpdate={useDebounce}
        defaultSelectOptions={options}
        onChange={setValue}
        labelKey="name"
        hasInput={true}
      />
</React.Fragment>
);
};

export default InputSelect;

    ```
        </CodeToggle>

#### Select Custom Filter {#filter-select}

<FilterSelect />
    <CodeToggle>
    ```jsx

import React, { useCallback, useState } from "react";

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
},
[filterBy]
);

const toggleFilterValue = (targetValue: string) =>
filterBy === targetValue ? setFilterBy("") : setFilterBy(targetValue);

const sortByName = useCallback(
(options: Plant[]) => options.sort((a, b) => (a.name > b.name ? 1 : -1)),
[]
);

const isFruitFilter = filterBy === "fruit";
const isVegFilter = filterBy === "vegetable";

return (
<React.Fragment>
<span>Filter by Fruit</span>
<input
type="checkbox"
checked={isFruitFilter}
onChange={() => toggleFilterValue("fruit")}
/>
<span>Filter by Vegetables</span>
<input
type="checkbox"
checked={isVegFilter}
onChange={() => toggleFilterValue("vegetable")}
/>
<span>Sort A-Z</span>
<input
type="checkbox"
checked={useSort}
onChange={() => setUseSort((prevValue) => !prevValue)}
/>
<Select
value={value}
isMultiValue={true}
defaultSelectOptions={options}
onChange={setValue}
sortFunction={useSort ? sortByName : null}
optionFilter={customFilter}
labelKey="name"
hasInput={true}
/>
</React.Fragment>
);
};

export default FilterSelect;

    ```
    </CodeToggle>

#### Select Paging {#select-paging}

The option list can also be paginated by providing the `recordsPerPage` prop. This will enable infiniteScroll and control the amount of options rendered in the list.

<SelectPaging />
<CodeToggle>
    ```jsx

import React, { useState } from "react";

import "./style.css";
import { Select } from "react-select-ui";

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

const PagedSelect = () => {
const [value, setValue] = useState([]);

return (
<React.Fragment>
<Select
        value={value}
        isMultiValue={true}
        recordsPerPage={10}
        defaultSelectOptions={options}
        onChange={setValue}
        labelKey="name"
        hasInput={true}
      />
</React.Fragment>
);
};

export default PagedSelect;

    ```
    </CodeToggle>
    

#### Categorized Options Example {#categorized-options}

The select options can either be rendered as a regular list or they can be categorized by a property of the option state object.
In order to enable the categorization feature, you need to pass the `isCategorized` prop as true, and also provide a `categoryKey` prop.

<CategorizedValues />
    <CodeToggle>
```jsx
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

```
    </CodeToggle>