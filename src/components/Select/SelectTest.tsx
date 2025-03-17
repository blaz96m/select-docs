import React, { useState, useCallback, useRef } from "react";
import { Select, SelectOptionList } from "react-select-ui";

type Params = {
  searchQuery?: string;
};

const App = () => {
  const [value, setValue] = useState<SelectOptionList>([]);
  const [isLoading, setIsLoading] = useState(false);
  const preventRef = useRef(true);

  const searchBooks = useCallback(async (_: any, signal?: AbortSignal) => {
    if (preventRef.current) {
      setIsLoading(true);

      const recordsPerPage = 20;

      const response = await fetch(
        `https://dummyjson.com/products/search?limit=${recordsPerPage}&skip=0&q=phone`,
        {
          signal,
        }
      );
      const data = await response.json();
      setIsLoading(false);
      preventRef.current = false;
      return { data: data.products, totalRecords: data.total };
    }
  }, []);

  return (
    <React.Fragment>
      <Select
        labelKey="title"
        lazyInit={true}
        key="async-input"
        isMultiValue={true}
        useAsync={true}
        fetchOnInputChange={false}
        fetchOnScroll={false}
        fetchFunction={searchBooks}
        isLoading={isLoading}
        value={value}
        onChange={setValue}
      />
    </React.Fragment>
  );
};

export default App;
