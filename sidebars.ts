import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure

  Showcase: [
    { type: "doc", id: "showcase", label: "Overview" },
    {
      type: "link",
      label: "Single Value",
      href: "/docs/showcase#single-value",
    },
    { type: "link", label: "Multi Value", href: "/docs/showcase#multi-value" },
    {
      type: "link",
      label: "Input Filtering",
      href: "/docs/showcase#input-select",
    },
    {
      type: "link",
      label: "Custom Filtering",
      href: "/docs/showcase#filter-select",
    },
    {
      type: "link",
      label: "Paginated Options",
      href: "/docs/showcase#select-paging",
    },
    {
      type: "link",
      label: "Categorized Options",
      href: "/docs/showcase#categorized-options",
    },
  ],

  Props: [
    { type: "doc", id: "props", label: "Overview " },
    {
      type: "link",
      label: "State Props",
      href: "/docs/props#state-props",
    },
    {
      type: "link",
      label: "Option Props",
      href: "/docs/props#option-props",
    },
    {
      type: "link",
      label: "Input Props",
      href: "/docs/props#input-props",
    },
    {
      type: "link",
      label: "Event Handler Props",
      href: "/docs/props#event-handler-props",
    },
    {
      type: "link",
      label: "Select Async Props",
      href: "/docs/props#select-async-props",
    },
    {
      type: "link",
      label: "Value Props",
      href: "/docs/props#value-props",
    },
    {
      type: "link",
      label: "Other Props",
      href: "/docs/props#other-props",
    },
  ],

  Async: [
    { type: "doc", id: "async", label: "Overview" },

    {
      type: "link",
      label: "Lazy Init",
      href: "/docs/async#lazy-init",
    },
    {
      type: "link",
      label: "Fetch On Input Change",
      href: "/docs/async#async-input",
    },
    {
      type: "link",
      label: "Fetch On Page Change",
      href: "/docs/async#async-paging",
    },
  ],

  Customization: [
    { type: "doc", id: "customization", label: "Overview" },
    {
      type: "link",
      label: "Custom Components",
      href: "/docs/customization#custom-components",
    },
    {
      type: "link",
      label: "Custom Option",
      href: "/docs/customization#custom-option",
    },
    {
      type: "link",
      label: "Custom Option List",
      href: "/docs/customization#custom-option-list",
    },
    {
      type: "link",
      label: "Custom Option Category",
      href: "/docs/customization#custom-option-category",
    },
    {
      type: "link",
      label: "Custom Input",
      href: "/docs/customization#custom-option-input",
    },
    {
      type: "link",
      label: "Custom Multi Value",
      href: "/docs/customization#custom-option-multi-value",
    },
    {
      type: "link",
      label: "Custom Dropdown Indicator",
      href: "/docs/customization#custom-dropdown-indicator",
    },

    {
      type: "link",
      label: "Custom Clear Indicator",
      href: "/docs/customization#custom-clear-indicator",
    },

    {
      type: "link",
      label: "Custom Refs",
      href: "/docs/customization#custom-select-ref",
    },
  ],

  Hooks: [
    { type: "doc", id: "hooks", label: "Overview" },
    {
      type: "link",
      label: "useSelect",
      href: "/docs/hooks#use-select",
    },
    {
      type: "link",
      label: "useSelectAsync",
      href: "/docs/hooks#use-select-async",
    },
  ],
};

export default sidebars;
