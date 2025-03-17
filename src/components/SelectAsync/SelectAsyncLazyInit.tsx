import React, { useState, useCallback, useRef } from "react";
import { Select, SelectOptionList } from "react-select-ui";

type Params = {
  searchQuery?: string;
  recordsPerPage?: number;
  page?: number;
};

const SelectAsynLazyComponent = () => {
  const [value, setValue] = useState<SelectOptionList>([]);
  const [isLoading, setIsLoading] = useState(false);
  const preventRef = useRef(true);

  const searchProducts = useCallback(
    async ({ recordsPerPage }: Params, signal?: AbortSignal) => {
      try {
        if (preventRef.current) {
          setIsLoading(true);

          const response = await fetch(
            `https://dummyjson.com/products/search?limit=${recordsPerPage!}&skip=0&q=phone`,
            {
              signal,
            }
          );
          const data = await response.json();
          setIsLoading(false);
          preventRef.current = false;
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
        lazyInit={true}
        isMultiValue={true}
        recordsPerPage={20}
        useAsync={true}
        fetchOnInputChange={false}
        fetchOnScroll={false}
        fetchFunction={searchProducts}
        isLoading={isLoading}
        value={value}
        onChange={setValue}
      />
    </React.Fragment>
  );
};

export default SelectAsynLazyComponent;
