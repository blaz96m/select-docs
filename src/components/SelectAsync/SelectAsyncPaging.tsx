import React, { useState, useCallback } from "react";
import { Select, SelectOptionList } from "select-ui";

type Params = {
  searchQuery?: string;
  page?: number;
};

const SelectAsyncPaging = () => {
  const [value, setValue] = useState<SelectOptionList>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchBooks = useCallback(
    async ({ searchQuery, page }: Params, signal?: AbortSignal) => {
      setIsLoading(true);
      const searchParam = searchQuery || "phone";
      const recordsPerPage = 15;
      const skip = (page - 1) * recordsPerPage;
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
        if (!signal.aborted) setIsLoading(false);
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
        fetchFunction={searchBooks}
        isLoading={isLoading}
        value={value}
        onChange={setValue}
      />
    </React.Fragment>
  );
};

export default SelectAsyncPaging;
