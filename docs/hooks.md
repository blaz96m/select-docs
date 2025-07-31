---
id: hooks
title: Select Hooks
---

import {
SelectHook
} from "@site/src/components/Hooks";
import {CodeToggle} from "@site/src/components/Other";

The last part of this documentation covers the hooks of the Select component, which can also be imported directly from the library. So far, we've explored the functionality of the component and the customization of its parts. But what if you want to maintain the logic and functionality of the Select while integrating it into your custom-built component? This is where the`useSelect`and`useSelectAsync` hooks come into play. These hooks encapsulate all the logic required to build the functionality of the Select component.

1. `useSelect` is the backbone of the Select component. It handles all of its core logic, from toggling the dropdown visibility to filtering the selected values and filtering the options by input. Much like the Select component itself, it accepts a handful of props that can modify its functionality for specific use cases.

2. `useSelectAsync` manages the state and functionality of data fetching. This hook abstracts the complexities of handling API calls, state changes, and UI interactions such as searching and pagination, enabling seamless integration with a variety of backend systems. Think of this hook as an extension of useSelect. To use it, you must first initialize useSelect and pass its result into useSelectAsync.

### Example

Here’s a simple example of a custom, lightweight Select component that can be opened and closed by clicking the dropdown indicator button, as opposed to the container itself. The functionality is entirely managed by the `useSelect` hook.
<SelectHook />

<CodeToggle >
    ```jsx

import React, { useState, useRef, useCallback } from "react";
import {
useSelect,
CategorizedSelectOptions,
SelectOptionList,
CustomState,
CustomStateSetters,
} from "react-select-ui";

import { isEmpty, map } from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

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
];

const LABEL_KEY = "name";
const PLACEHOLDER = "Select a value";

const SelectHook = () => {
const [value, setValue] = useState<SelectOptionList>([]);
const [selectOptionList, setSelectOptionList] =
useState<SelectOptionList>(options);

const customState: CustomState = {
value,
customSelectOptions: selectOptionList,
};
const customStateSetters: CustomStateSetters = {
setValue,
customSetSelectOptions: setSelectOptionList,
};

const selectApi = useSelect({
isMultiValue: false,
customState,
customStateSetters,
labelKey: "name",
isCategorized: true,
closeDropdownOnSelect: false,
categoryKey: "type",
});

const { selectState, selectEventHandlers, displayedOptions, selectDomRefs } =
selectApi;

const { inputValue, isOpen } = selectState;

const { handleDropdownClick, handleOptionClick, handleInputChange } =
selectEventHandlers;

const selectDisplayedOptions = displayedOptions as CategorizedSelectOptions;

const { inputRef } = selectDomRefs;

const focusInput = () => inputRef.current?.focus();

const optionListClassName = clsx({
"select_option-list_container": true,
"select_option-list_container-empty": isEmpty(displayedOptions),
});

const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
if (e.code === "Backspace" && !isEmpty(value)) {
setValue([]);
}
};

const valueLabel = !isEmpty(value) ? value[0][LABEL_KEY] : "";
return (

<div className="select_container">
<div onClick={focusInput} className="select_top">
<div className="value-section">
<p className="select_value">
{isEmpty(valueLabel) ? PLACEHOLDER : valueLabel}
</p>
<div className="select_input_container">
<input
ref={inputRef}
className="select_input"
onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
handleInputChange(e.target.value)
}
onKeyDown={onInputKeyDown}
value={inputValue}
/>
</div>
</div>
<div className="select_indicator" onClick={handleDropdownClick}>
<FontAwesomeIcon
icon={isOpen ? faChevronUp : faChevronDown}
size="lg"
/>
</div>
</div>
{isOpen && (
<div className={optionListClassName}>
{isEmpty(displayedOptions) && <h4>No Options Found</h4>}
<ul className="select_list">
{map(selectDisplayedOptions, (options, category) => {
return (
<div>
<p className="select_category">{category}</p>
<ul className="select_option_list">
{map(options, (option) => {
return (
<div
onClick={() =>
handleOptionClick(option, false, false)
}
className="select_option" >
{option[LABEL_KEY]}
</div>
);
})}
</ul>
</div>
);
})}
</ul>
</div>
)}
</div>
);
};

export default SelectHook;

    ```
</CodeToggle> 

### useSelect {#use-select}

#### Arguments:

#### selectProps:

An object containing configuration options for the hook.

#### selectProps values

| Property Name                   | Description                                                                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `isMultiValue`                  | Boolean that determines if multiple values can be selected inside the select.                                                     |
| `customState`                   | An object that holds custom state values specific to the select component.                                                        |
| `customStateSetters`            | Functions to update `customState`.                                                                                                |
| `labelKey`                      | Specifies the key in the select options used as the display label.                                                                |
| `fetchOnInputChange`            | Boolean that determines if the fetch function will get called when the input value changes.                                       |
| `clearInputOnIdicatorClick`     | A boolean that determines whether the input field will be cleared when the clear indicator (e.g., "X" button) is clicked.         |
| `defaultSelectOptions`          | Default options available in the select dropdown.                                                                                 |
| `optionFilter`                  | A function that takes an individual option (iteratee) as an argument and filters the list of options based on the provided logic. |
| `closeDropdownOnSelect`         | Boolean that determines if the dropdown should close after an option is selected.                                                 |
| `clearInputOnSelect`            | A boolean that determines whether the input field should be cleared when an option is selected.                                   |
| `preventInputUpdate`            | Function holding custom logic to prevent input updates under certain conditions.                                                  |
| `clearValueOnInputChange`       | Boolean that determines if the value should get cleared after the input value gets updated.                                       |
| `fetchOnScroll`                 | Boolean that determines if the fetch function should be called on page change triggered by scroll.                                |
| `hasInput`                      | Boolean that indicates if the component has an input field for searching.                                                         |
| `useAsync`                      | Boolean that determines if options should be loaded asynchronously.                                                               |
| `categoryKey`                   | Specifies a key used for categorizing options.                                                                                    |
| `removeSelectedOptionsFromList` | Boolean that determines if the selected options should be removed from the dropdown list.                                         |
| `sortFunction`                  | Custom sorting function for the options list.                                                                                     |
| `debounceInputUpdate`           | Enables debouncing for input updates to optimize performance.                                                                     |
| `inputUpdateDebounceDuration`   | Time in milliseconds to wait before updating input.                                                                               |
| `recordsPerPage`                | Number of records to fetch per page for pagination.                                                                               |
| `isLoading`                     | Boolean that Indicates if data is currently being loaded.                                                                         |
| `isCategorized`                 | Boolean that determines if the options should be displayed in categories.                                                         |
| `inputFilterFunction`           | Custom function to filter options based on input.                                                                                 |

#### Returns:

#### SelectApi

An object that provides access to key functionalities and state management of the select component.

#### SelectApi properties

| Property Name              | Description                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `selectState`              | Object that holds the current state of the select component.                                                             |
| `selectStateUpdaters`      | Functions to update `selectState`.                                                                                       |
| `selectFocusState`         | Object that holds the focus state details of the select options.                                                         |
| `selectFocusHandlers`      | Functions to handle focus-related events like keyboard events and hovering.                                              |
| `handleOptionsInputFilter` | Filters available options based on the provided input value.                                                             |
| `usesInputAsync`           | Boolean that determines if the select component fetches options asynchronously via input change.                         |
| `onOptionSelect`           | Function that handles the selection or deselection of an option.                                                         |
| `isLastPage`               | Returns `true` if there are no more pages of options to load.                                                            |
| `preventInputUpdate`       | Function that holds the resolved logic to prevent updates to the input value under certain conditions.                   |
| `selectEventHandlers`      | Default event handlers for managing user interactions with the select component.                                         |
| `displayedOptions`         | The list of currently displayed options, either flat or categorized.                                                     |
| `getOriginalOptions`       | Returns the full list of unfiltered options.                                                                             |
| `setOriginalOptions`       | Updates the full list of unfiltered options.                                                                             |
| `getSelectOptionsMap`      | Returns a `Map` of option elements for DOM manipulation.                                                                 |
| `closeDropdownOnSelect`    | Boolean that etermines whether the dropdown should close after selecting an option.                                      |
| `closeDropdown`            | Programmatically closes the dropdown menu.                                                                               |
| `focusInput`               | Programmatically focuses the input field.                                                                                |
| `selectDomRefs`            | Contains references to key DOM elements within the select component.                                                     |
| `handlePageReset`          | Resets the pagination state to the first page.                                                                           |
| `clearInputOnSelect`       | A boolean that determines whether the input field should be cleared when an option is selected. Holds the resolved value |
| `loadNextPage`             | Increments the state of the page.                                                                                        |
| `filterSearchedOptions`    | Filters the options based on the current input value.                                                                    |

### useSelectAsync {#use-select-async}

#### Arguments:

#### selectApi:

The SelectApi

#### selectProps:

An object containing configuration options for the hook.

#### selectProps values

| Property Name                   | Description                                                                                                                                         |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `updateSelectOptionsAfterFetch` | A boolean that determines whether the select options should be updated after a fetch operation.                                                     |
| `fetchFunction`                 | A function used to fetch select options asynchronously.                                                                                             |
| `useAsync`                      | A boolean that indicates if the select options should be fetched asynchronously.                                                                    |
| `inputUpdateDebounceDuration`   | The duration in milliseconds to debounce the input update.                                                                                          |
| `isLoading`                     | A boolean that indicates if the select options are currently being loaded.                                                                          |
| `recordsPerPage`                | The number of records to fetch per page for pagination.                                                                                             |
| `fetchOnInputChange`            | A boolean that determines if the fetch function should be called when the input value changes.                                                      |
| `isLazyInit`                    | A boolean that determines whether the fetch function should be called when the dropdown is expanded for the first time, as opposed to on page load. |
| `fetchOnScroll`                 | A boolean that determines if the fetch function should be called on page change triggered by scroll.                                                |

#### Returns:

#### SelectAsyncApi

An object that provides information based on the async operations of the component.

#### SelectAsyncApi properties:

| Property Name           | Description                                                                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isLastPage`            | A function that returns a boolean indicating if the current page is the last page of options.                                                                  |
| `isInitialFetch`        | A function that returns a boolean indicating if the current fetch is the initial fetch.                                                                        |
| `fetchOnScrollToBottom` | A boolean that determines if the fetch function should be triggered when scrolling to the bottom (return true if useAsync and fetchOnScroll are set to true ). |
| `loadNextPageAsync`     | A function that loads the next page of options asynchronously.                                                                                                 |
