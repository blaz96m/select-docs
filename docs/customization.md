---
id: customization
title: Customization
---

import {
CustomComponent,
CustomRef
} from "@site/src/components/CustomSelect";
import {CodeToggle} from "@site/src/components/Other";

## Custom Components {#custom-components}

Provides you with the option of replacing a certain component inside the Select in order to change its appearance, structure, or functionality. To use your custom components, pass them into the `customComponents` prop.

You will receive two arguments for your custom component renderer function:

1. Component props - all the props and functionality the original component uses in the Select.
2. Inner props - actions and attributes that should be applied to the JSX elements of the component.

### Example {#custom-components-example}

Here is a simple example where we create a custom option component that contains a checkmark.

<CustomComponent />
    <CodeToggle>
    ```jsx

import React, { useState, useCallback } from "react";
import {
Select,
SelectOptionList,
CustomSelectOptionComponent,
} from "react-select-ui";

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

const CustomSelectComponent = async () => {
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
defaultSelectOptions={options}
value={value}
onChange={setValue}
/>
</React.Fragment>
);
};

export default CustomSelectComponent;

    ```
        </CodeToggle>

Below is a list of every custom component you can pass to the `customComponents` prop, along with the `componentProps` and `innerProps` they provide.

## Custom Option {#custom-option}

### Component Props

#### `onOptionSelect`

`(isSelected: boolean, option: SelectOptionT, isDisabled: boolean) => void`

`SelectOptionT Reference:` [`SelectOptionT`](#selectoptiont-definition)

#### `value`

[`SelectOptionList`](#selectoptionlist-definition)

#### `setValue`

`Dispatch<SetStateAction<T>> | ((arg: T) => void)`

#### `clearInput`

`() => void`

#### `focusInput`

`() => void`

#### `getSelectOptionsMap`

`() => Map<string, HTMLDivElement>`

#### `labelKey`

`keyof SelectOptionT`

`SelectOptionT Reference:` [`SelectOptionT`](#selectoptiont-definition)

#### `clearInputOnSelect`

`boolean`

#### `isMultiValue`

`boolean`

#### `isDisabled`

`boolean`

#### `closeDropdown`

`() => void`

#### `resetFocus`

`() => void`

#### `isFocused`

`boolean`

#### `optionIndex`

`number`

#### `isSelected`

`boolean`

#### `option`

[`SelectOptionT`](#selectoptiont-definition)

#### `isCategorized`

`boolean`

#### `categoryKey`

`keyof SelectOptionT`

`SelectOptionT Reference:` [`SelectOptionT`](#selectoptiont-definition)

### Inner Props

#### `onClick`

`(...args: any) => void`

#### `onMouseMove`

`(...args: any) => void`

#### `data-category`

`boolean`

#### `data-selected`

`boolean`

#### `key`

`string | number`

#### `ref`

`React.LegacyRef<HTMLDivElement>`

#### `id`

`string`

#### `className`

`string`

---

## Custom Option List {#custom-option-list}

### Component Props

#### `handlePageChange`

`() => void`

#### `page`

`number`

#### `isLastPage`

`() => boolean | void`

#### `fetchOnScrollToBottom`

`boolean | undefined`

#### `displayedOptions`

`SelectOptionList | CategorizedSelectOptions`

`Types Reference:` [`SelectOptionList`](#selectoptionlist-definition)

#### `isCategorized`

`boolean`

#### `isLoading`

`boolean`

#### `handleScrollToBottom`

`() => void`

### Inner Props

#### `wrapperClassName`

`string`

#### `ref`

`RefObject<HTMLDivElement>`

#### `listClassName`

`string`

---

## Custom Category {#custom-option-category}

### Component Props

#### `value`

[`SelectOptionList`](#selectoptionlist-definition)

#### `categoryOptions`

[`CategorizedSelectOptions`](#categorized-select-definition)

#### `categoryName`

`keyof SelectOptionT`

`SelectOptionT Reference:` [`SelectOptionT`](#selectoptiont-definition)

#### `selectedOptions`

`SelectOptionList | null`

`SelectOptionList Reference:` [`SelectOptionList`](#selectoptionlist-definition)

#### `focusedOptionIdx`

`number | null`

#### `renderOption`

`(option: SelectOptionT, index: number, focusedOptionIdx: number | null, selectedOptions: SelectOptionList | null) => React.JSX.Element`

`Types Reference:` [`SelectOptionT`](#selectoptiont-definition)

### Inner Props

#### `categoryHeaderClassName`

`string`

#### `categoryListClassName`

`string`

---

## Custom Input {#custom-option-input}

### Component Props

#### `selectOptions`

[`SelectOptionT`](#selectoptiont-definition)

#### `displayedOptions`

`SelectOptionList | CategorizedSelectOptions`

`Types Reference:` [`SelectOptionList`](#selectoptionlist-definition)

#### `value`

[`SelectOptionT`](#selectoptiont-definition)

#### `selectOptionListRef`

`RefObject<HTMLDivElement>`

#### `setInputValue`

`StateSetter<string>`

#### `getOriginalOptions`

`() => SelectOptionList`

`SelectOptionList Reference:` [`SelectOptionList`](#selectoptionlist-definition)

#### `setSelectOptions`

`(options: SelectOptionList) => void`

`SelectOptionList Reference:` [`SelectOptionList`](#selectoptionlist-definition)

#### `handleInputChange`

`(e: ChangeEvent<HTMLInputElement>, value?: SelectOptionList) => void`

`SelectOptionList Reference:` [`SelectOptionList`](#selectoptionlist-definition)

#### `handleValueSelectOnKeyPress`

`() => void`

#### `focusedOptionIndex`

`number | null`

#### `focusedOptionCategory`

`keyof SelectOptionT`

`SelectOptionT Reference:` [`SelectOptionT`](#selectoptiont-definition)

#### `focusPreviousOption`

`() => void`

#### `focusNextOption`

`(fallbackDirection?: "next" | "previous" | "opposite") => void`

#### `openDropdown`

`() => void`

#### `closeDropdown`

`() => void`

#### `clearAllValues`

`() => void`

#### `inputValue`

`string`

#### `debounceInputUpdate`

`boolean`

#### `preventInputUpdate`

`(e: ChangeEvent<HTMLInputElement>, updatedInputValue: string) => boolean`

#### `isLoading`

`boolean`

---

## Custom Multi-Value {#custom-option-multi-value}

### Component Props

#### `value`

[`SelectOptionT`](#selectoptiont-definition)

#### `labelKey`

`keyof SelectOptionT`

`SelectOptionT Reference:` [`SelectOptionT`](#selectoptiont-definition)

#### `valueList`

[`SelectOptionList`](#selectoptionlist-definition)

#### `handleValueClear`

`(e: React.MouseEvent<HTMLDivElement>, option: SelectOptionT) => void`

`SelectOptionT Reference:` [`SelectOptionT`](#selectoptiont-definition)

### Inner Props

#### `className`

`string`

#### `iconContainerClassName`

`string`

#### `iconClassName`

`string`

#### `onClick`

`(e: React.MouseEvent<HTMLDivElement>, option: SelectOptionT) => void`

`SelectOptionT Reference:` [`SelectOptionT`](#selectoptiont-definition)

---

## Custom Dropdown Indicator {#custom-dropdown-indicator}

### Component Props

#### `isOpen`

`boolean`

#### `isLoading`

`boolean`

### Inner Props

#### `className`

`string`

---

## Custom Clear Indicator {#custom-clear-indicator}

### Component Props

#### `isLoading`

`boolean | undefined`

#### `value`

[`SelectOptionList`](#selectoptionlist-definition)

#### `clearValueOnInputChange`

`boolean`

#### `inputValue`

`string`

#### `clearInputOnIdicatorClick`

`boolean`

### Inner Props

#### `onClick`

`(e: MouseEvent<HTMLDivElement>) => void`

#### `className`

`string`

## Custom Refs {#custom-select-ref}

If you want to pass your own custom refs for the Select input and option list components so that you can control them outside the component, you can do so by passing them into the `refs` prop.

### Example

Here is a simple example with a button that will focus the input of the select component when clicked.

<CustomRef/>
    <CodeToggle>
```jsx

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

```
    </CodeToggle>

## Type Definitions

| **Type**                                                                | **Definition**                                 |
| ----------------------------------------------------------------------- | ---------------------------------------------- |
| <a name="selectoptiont-definition"></a> `SelectOptionT`                 | `{ id: string or number, [key: string]: any }` |
| <a name="selectoptionlist-definition"></a> `SelectOptionList`           | `SelectOptionT []`                             |
| <a name="categorized-select-definition"></a> `CategorizedSelectOptions` | `{ [key: string]: SelectOptionList }`          |
