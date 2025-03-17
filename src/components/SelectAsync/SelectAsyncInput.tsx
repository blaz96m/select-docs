import React, { useState, useCallback, useRef } from "react";
import { Select, SelectOptionList } from "react-select-ui";

type Params = {
  searchQuery?: string;
  recordsPerPage?: number;
  page?: number;
};

const SelectAsyncInput = () => {
  const [value, setValue] = useState<SelectOptionList>([]);
  const [isLoading, setIsLoading] = useState(false);
  const prevInputRef = useRef("");
  const isInitalRef = useRef(true);

  const searchProducts = useCallback(
    async ({ searchQuery, recordsPerPage }: Params, signal?: AbortSignal) => {
      try {
        if (prevInputRef.current !== searchQuery || isInitalRef.current) {
          setIsLoading(true);
          const searchParam = searchQuery || "phone";

          const response = await fetch(
            `https://dummyjson.com/products/search?limit=${recordsPerPage}&skip=0&q=${searchParam}`,
            {
              signal,
            }
          );
          const data = await response.json();
          prevInputRef.current = searchQuery;
          isInitalRef.current = false;
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
        fetchFunction={searchProducts}
        isLoading={isLoading}
        recordsPerPage={20}
        value={value}
        onChange={setValue}
      />
    </React.Fragment>
  );
};

export default SelectAsyncInput;
