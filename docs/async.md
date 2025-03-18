---
id: async
title: Select Async
---

import {
SelectAsyncPaging,
SelectAsyncLazyInit,
SelectAsyncInput,
SelectAsyncBasic,
} from "@site/src/components/SelectAsync";

This section covers the **async functionality** of the Select component. To enable async mode, set the `useAsync` prop to `true` and provide a `fetchFunction` that handles data fetching. The component can also manage query parameters state of the request for you .

:::caution
When using async mode, make sure to pass the `isLoading` prop to the component. This ensures that appropriate UI components and actions are disabled while fetching the data. The Select component itself does **not** handle the loading state.
:::

:::caution
Paginating data in an async enviorment via the `recordsPerPage` prop on the front-end is only avialable if the data cannot be filtered by the fetch function. If you enable fetching on input change or on page change the pagination needs to be handled on the backend in order for the Select to use infinite scroll.
:::

:::info
The API used for these examples is the **Dummy JSON API** from [DumyJSON](https://dummyjson.com/).
:::

### Lazy Init {#lazy-init}

If you dont want the fetch function to run on the initial page load but rather the first time the dropdown gets expanded you can set the `lazyInit` prop as true to accomplish this.

<SelectAsyncLazyInit />

    ```js

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

const searchProducts = useCallback(
async ({ recordsPerPage }: Params, signal?: AbortSignal) => {
try {
setIsLoading(true);
const response = await fetch(
`https://dummyjson.com/products/search?limit=${recordsPerPage!}&skip=0&q=phone`,
{
signal,
}
);
const data = await response.json();
setIsLoading(false);
return { data: data.products, totalRecords: data.total };

} catch (err) {
setIsLoading(false);
}
},
[]);

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

    ```

### Fetch On Input Change {#async-input}

If you wish to enable fetching on input change please pass the fetchOnInputChange prop as true. The triggering of the fetch function after the input update is debounced with a default duration of 500. You can tweak the duration of the debounce via the inputUpdateDebounceDuration prop. You will recieve the search query value in the params object that gets passed as the first argument of the fetchFunction.

<SelectAsyncInput />

    ```js

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

const searchProducts = useCallback(
async ({searchQuery, recordsPerPage}: Params, signal?: AbortSignal) => {
try {
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
setIsLoading(false);
return { data: data.products, totalRecords: data.total };

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

    ```

### Fetch On Scroll {#async-paging}

If you whish to enable infinite scrolling for the async functionality you can pass the fetchOnScroll prop as true. The page number will be accessible in the first parameter of the fetch function along with the search query value.

<SelectAsyncPaging />

    ```js

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
const skip = (page - 1) \* recordsPerPage!;
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

    ```
