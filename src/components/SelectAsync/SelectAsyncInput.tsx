import React, { useState, useCallback, useReducer, useRef } from "react";
import { Select, SelectOptionList } from "select-ui";

type Params = {
  searchQuery?: string;
};

const SelectAsyncInput = () => {
  const [value, setValue] = useState<SelectOptionList>([]);
  const [isLoading, setIsLoading] = useState(false);
  const prevInputRef = useRef("");
  const isInitalRef = useRef(true);

  const searchBooks = useCallback(
    async ({ searchQuery }: Params, signal?: AbortSignal) => {
      try {
        if (prevInputRef.current !== searchQuery || isInitalRef.current) {
          setIsLoading(true);
          const searchParam = searchQuery || "phone";
          const recordsPerPage = 30;

          const response = await fetch(
            `https://dummyjson.com/products/search?limit=${recordsPerPage}&skip=0&q=${searchParam}`,
            {
              signal,
            }
          );
          const data = await response.json();
          prevInputRef.current = searchQuery;
          isInitalRef.current = false;
          console.log(data);
          setIsLoading(false);
          return { data: data.products, totalRecords: data.total };
        }
      } catch (err) {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <React.Fragment>
      <Select
        labelKey="title"
        key="async-input"
        isMultiValue={true}
        useAsync={true}
        fetchOnInputChange={true}
        lazyInit={true}
        fetchFunction={searchBooks}
        isLoading={isLoading}
        recordsPerPage={10}
        value={value}
        onChange={setValue}
      />
    </React.Fragment>
  );
};

export default SelectAsyncInput;
