import React, { useState, useCallback } from "react";
import { Select, SelectOptionList } from "react-select-ui";

type Params = {
  searchQuery?: string;
  page?: number;
  recordsPerPage?: number;
};

const SelectAsyncPaging = () => {
  const [value, setValue] = useState<SelectOptionList>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchProducts = useCallback(
    async (
      { searchQuery, page = 1, recordsPerPage }: Params,
      signal?: AbortSignal
    ) => {
      setIsLoading(true);
      const defaultQuery = "a";
      const searchParam = searchQuery || defaultQuery;
      const skip = (page - 1) * recordsPerPage!;
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?limit=${recordsPerPage}&skip=${skip}&q=${searchParam}`,
          {
            signal,
          }
        );
        const data = await response.json();
        return { data: data.products, totalRecords: data.total };
      } catch (err) {
      } finally {
        if (signal && !signal.aborted) setIsLoading(false);
      }
    },
    []
  );

  return (
    <React.Fragment>
      <Select
        labelKey="title"
        isMultiValue={true}
        useAsync={true}
        recordsPerPage={15}
        lazyInit={true}
        fetchOnInputChange={true}
        fetchOnScroll={true}
        fetchFunction={searchProducts}
        isLoading={isLoading}
        value={value}
        onChange={setValue}
      />
    </React.Fragment>
  );
};

export default SelectAsyncPaging;
