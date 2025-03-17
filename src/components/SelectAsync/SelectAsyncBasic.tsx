import React, { useState, useCallback } from "react";
import { Select, SelectOptionList } from "react-select-ui";

const SelectAsyncBasicComponent = () => {
  const [value, setValue] = useState<SelectOptionList>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchBooks = useCallback(async (_: any, signal?: AbortSignal) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q="lord"&limit=150`,
        {
          mode: "cors",
          signal,
        }
      );
      const data = await response.json();
      const mappedData = data.docs.map((doc) => ({ ...doc, id: doc.key }));
      return { data: mappedData, totalRecords: data.numFound };
    } catch (err) {
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  return (
    <React.Fragment>
      <Select
        labelKey="title"
        isMultiValue={false}
        useAsync={true}
        fetchFunction={searchBooks}
        isLoading={isLoading}
        recordsPerPage={10}
        value={value}
        onChange={setValue}
      />
    </React.Fragment>
  );
};

export default SelectAsyncBasicComponent;
