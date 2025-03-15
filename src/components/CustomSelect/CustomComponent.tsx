import React, { useState } from "react";
import {
  Select,
  SelectOptionList,
  CustomSelectOptionComponent,
} from "select-ui";

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

const CustomComponent = () => {
  const [value, setValue] = useState<SelectOptionList>([]);

  const CustomSelectOptionComponent: CustomSelectOptionComponent = (
    componentProps,
    innerProps
  ) => {
    const { labelKey, option, isSelected } = componentProps;
    const optionLabel = option[labelKey];

    const { key, className: defaultClassName, ...otherProps } = innerProps;

    const className = `${defaultClassName} select-option-checkbox`;

    return (
      <div {...otherProps} className={className} key={key}>
        <input type="checkbox" checked={isSelected} onChange={() => null} />
        <p>{optionLabel}</p>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Select
        labelKey="name"
        isMultiValue={true}
        customComponents={{ SelectOptionElement: CustomSelectOptionComponent }}
        removeSelectedOptionsFromList={false}
        defaultSelectOptions={options}
        value={value}
        onChange={setValue}
      />
    </React.Fragment>
  );
};

export default CustomComponent;
