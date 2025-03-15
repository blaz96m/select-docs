---
id: props
title: Props
---

## State Props: {#state-props}

There are two things to note when passing custom state to the `Select` component:

1. Along with passing the state property, its respective setter should also be provided in the props for the component to work properly.
2. You do not need to handle state updates inside the `Select` component, as it will handle this for you.

The main purpose of this approach is to allow you to reference and update state values outside of the component, without needing to modify its default functionality.

If you want to customize the handling of certain functionality within the `Select` component, you can do so (see the "Event Handlers" section for more details).

#### `inputValue`

The value of the input field.

`string`

#### `setInputValue`

Setter function to update `inputValue`.

`(inputValue: string) => void`

#### `selectOptions`

The list of options available in the select dropdown.

[`SelectOptionList`](#selectoptionlist-definition)

#### `setSelectOptions`

Setter function to update `selectOptions`.

`(options: SelectOptionList) => void`

`SelectOptionList Reference`: [`SelectOptionList`](#selectoptionlist-definition)

#### `isOpen`

Determines whether the dropdown is open or closed.

`boolean`

#### `setIsOpen`

Setter function to update `isOpen`.

`(isOpen: boolean) => void`

#### `page`

The current page of the paginated options.

`number`

#### `setPage`

Setter function to update `page`.

`(page: number) => void`

---

## Option Props: {#option-props}

#### `labelKey` **(Required)**

The key of the option state whose value will be displayed in the `Select`.

`keyof SelectOptionT`

`SelectOptionT reference:` [`SelectOptionT`](#selectoptiont-definition)

#### `removeSelectedOptionsFromList` **(Default: `true`)**

Determines whether the selected options are removed from the option list upon being selected.

`boolean`

#### `isCategorized` **(Default: `false`)**

Determines whether the `Select` option list will be categorized. If set to `true`, the `categoryKey` prop is required.

`boolean`

#### `categoryKey`

The key of the `Select` option state object used to categorize the option list. This prop is only applied if `isCategorized` is `true`.

`keyof SelectOptionT`

`SelectOptionT reference:` [`SelectOptionT`](#selectoptiont-definition)

#### `optionFilter`

Function used to filter the select options list. Takes the current iteratee of the options list and apply the filter logic to it.

`(option: SelectOptionT) => boolean`

`SelectOptionT reference:` [`SelectOptionT`](#selectoptiont-definition)

#### `closeDropdownOnSelect` **(Default: `true` for single value, `false` for multi-value)**

Indicates whether the dropdown will close upon an option being selected.

`boolean`

#### `defaultSelectOptions`

The default select options.

[`SelectOptionList`](#selectoptionlist-definition)

#### `isOptionDisabled`

Function that determines whether an option in the list is disabled.

`(option: SelectOptionT) => boolean`

`SelectOptionT reference:` [`SelectOptionT`](#selectoptiont-definition)

#### `sortFunction`

Function used to sort the select options list.

`(options: SelectOptionList) => SelectOptionList`

`SelectOptionList Reference:` [`SelectOptionList`](#selectoptionlist-definition)

#### `recordsPerPage`

Number indicating the amount of options to be displayed in the list. It will paginate the option list and enable infinite scroll if `fetchOnScroll` and `fetchOnInputChange` are `false`.

`number`

---

## Input Props: {#input-props}

#### `clearInputOnIndicatorClick`

Determines whether the input will be cleared upon clicking the clear indicator button.

`boolean`

#### `hasInput` **(Default: `true`)**

Determines whether the select input component is used.

`boolean`

#### `preventInputUpdate`

Function that prevents the input from updating if `true`.

`(e: ChangeEvent<HTMLInputElement>, updatedInputValue: string, currInputValue: string) => boolean`

#### `debounceInputUpdate` **(Default: `false`)**

Determines whether the input update is debounced (this does not affect async input updates, which are debounced by default).

`boolean`

#### `inputUpdateDebounceDuration` **(Default: `500`)**

The debounce duration for input changes. For non-async input behavior, this only applies if `debounceInputUpdate` is `true`. For async behavior, the debounce is applied by default and this prop is unaffected by `debounceInputUpdate`.

`number`

#### `clearInputOnSelect` **(Default: `true` for single value, `false` for multi-value)**

Determines whether the input will be cleared upon an option being selected.

`boolean`

#### `inputFilterFunction`

Custom function for filtering the select option list via the input value.

`(selectOptions: SelectOptionList, inputValue: string) => SelectOptionList`

`SelectOptionList Reference:` [`SelectOptionList`](#selectoptionlist-definition)

---

## Event Handler Props: {#event-handler-props}

Event handler props are used to update the state of the component and execute follow-up behavior. There are two options for providing a prop for an event handler:

- `set(name of event handler)`: This completely overwrites the default behavior, leaving the function entirely under your control.
- `onAfter(name of event handler)`: This runs after the default handler, allowing you to execute custom logic while still maintaining the default behavior.

#### `onOptionClick`

Overrides the default option click handler.

`(option: SelectOptionT, isSelected: boolean, isDisabled: boolean) => void`

`SelectOptionT reference:` [`SelectOptionT`](#selectoptiont-definition)

#### `onAfterOptionClick`

Runs after the default option click handler has been executed.

`(option: SelectOptionT, isSelected: boolean, isDisabled: boolean) => void`

`SelectOptionT reference:` [`SelectOptionT`](#selectoptiont-definition)

#### `onClearIndicatorClick`

Overrides the default clear indicator click handler.

`(e: MouseEvent<HTMLDivElement>, inputValue: string, value: SelectOptionList) => void`

`SelectOptionList Reference:` [`SelectOptionList`](#selectoptionlist-definition)

#### `onAfterClearIndicatorClick`

Runs after the default clear indicator click handler has been executed.

`(e: MouseEvent<HTMLDivElement>, inputValue: string, value: SelectOptionList) => void`

`SelectOptionList Reference:` [`SelectOptionList`](#selectoptionlist-definition)

#### `onDropdownClick`

Overrides the default dropdown click handler.

`(isOpen: boolean) => void`

#### `onAfterDropdownClick`

Runs after the default dropdown click handler has been executed.

`(isOpen: boolean) => void`

#### `onInputChange`

Overrides the default input change handler.

`(e: ChangeEvent<HTMLInputElement>, optionList: SelectOptionList, value?: SelectOptionList) => void`

`SelectOptionList Reference:` [`SelectOptionList`](#selectoptionlist-definition)

#### `onAfterInputChange`

Runs after the default input change handler has been executed.

`(e: ChangeEvent<HTMLInputElement>, optionList: SelectOptionList, value?: SelectOptionList) => void`

`SelectOptionList Reference:` [`SelectOptionList`](#selectoptionlist-definition)

#### `onValueClear`

Overrides the default value clear click handler.

`(e: MouseEvent<HTMLDivElement>, option: SelectOptionT) => void`

`SelectOptionT reference:` [`SelectOptionT`](#selectoptiont-definition)

#### `onAfterValueClear`

Runs after the default value clear click handler has been executed.

`(e: MouseEvent<HTMLDivElement>, option: SelectOptionT) => void`

`SelectOptionT reference:` [`SelectOptionT`](#selectoptiont-definition)

#### `onScrollToBottom`

Overrides the default scroll-to-bottom handler.

`(options: SelectOptionList | {[key: string]: SelectOptionList}, page: number) => void`

`SelectOptionList Reference:` [`SelectOptionList`](#selectoptionlist-definition)

#### `onAfterScrollToBottom`

Runs after the default scroll-to-bottom handler has been executed.

`(options: SelectOptionList | {[key: string]: SelectOptionList}, page: number) => void`

`SelectOptionList Reference:` [`SelectOptionList`](#selectoptionlist-definition)

#### `onKeyDown`

Overrides the default keydown handler.

`(e: React.KeyboardEvent<HTMLInputElement>) => void`

---

## Select Async Props: {#select-async-props}

#### `useAsync` **(Default: `false`)**

Enables the async functionalities.

`boolean`

#### `fetchFunction`

The async function responsible for fetching data. Required if `useAsync` is set to `true`.

`(params: { page?: number; searchQuery?: string; recordsPerPage?: number; }, signal?: AbortSignal) => Promise<{ data: SelectOptionList, totalRecords: number }> | Promise<void>`

`SelectOptionList Reference:` [`SelectOptionList`](#selectoptionlist-definition)

#### `isLoading`

The loader state of the fetch function. Please provide this value when using async functionality, as the component does not handle the loading state for the fetch function.

`boolean`

#### `fetchOnInputChange` **(Default: `false`)**

Determines whether the input change should trigger the fetch function with the `inputValue` as the `searchQuery` parameter. The input change is debounced by default.

`boolean`

#### `fetchOnScroll`

Enables infinite fetching for async `Select`. When enabled, the page change will trigger the fetch function with the `page` value.

`boolean`

#### `updateSelectOptionsAfterFetch` **(Default: `true`)**

Determines whether the `Select` options state will be updated by the component after the fetch function executes.

`boolean`

#### `lazyInit` **(Default: `false`)**

When enabled, the fetch function will not be called until the dropdown is opened.

`boolean`

---

## Value Props: {#value-props}

#### `isMultiValue` **(Default: `false`)**

Determines whether the `Select` can hold multiple values.

`boolean`

#### `placeholder`

The placeholder text for the select input.

`string`

#### `clearValueOnInputChange` **(Default: `true` for single value, `false` for multi-value)**

Determines whether the select value will be cleared after the input has changed.

`boolean`

---

## Other Props: {#other-props}

#### `showClearIndicator`

Determines whether the clear indicator component will be displayed.

`boolean`

#### `isDisabled`

Determines whether the `Select` component is disabled.

`boolean`

## Type Definitions

| **Type**                                                      | **Definition**                                 |
| ------------------------------------------------------------- | ---------------------------------------------- |
| <a name="selectoptiont-definition"></a> `SelectOptionT`       | `{ id: string or number, [key: string]: any }` |
| <a name="selectoptionlist-definition"></a> `SelectOptionList` | `SelectOptionT []`                             |
