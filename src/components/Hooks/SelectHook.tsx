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
    clearValueOnInputChange: true,
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
            {isEmpty(valueLabel) ? (inputValue ? "" : PLACEHOLDER) : valueLabel}
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
                          className="select_option"
                        >
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
