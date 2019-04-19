/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PoeInfo } from "./globalTypes";

// ====================================================
// GraphQL query operation: AllItemsQuery
// ====================================================

export interface AllItemsQuery_getTabs_tabs_color {
  __typename: "Color";
  r: number;
  g: number;
  b: number;
}

export interface AllItemsQuery_getTabs_tabs {
  __typename: "Tab";
  name: string;
  index: number;
  color: AllItemsQuery_getTabs_tabs_color;
}

export interface AllItemsQuery_getTabs_items {
  __typename: "Item";
  image: string;
  baseName: string;
  stackSize: number | null;
}

export interface AllItemsQuery_getTabs {
  __typename: "TabData";
  numTabs: number;
  tabs: AllItemsQuery_getTabs_tabs[];
  items: AllItemsQuery_getTabs_items[] | null;
}

export interface AllItemsQuery {
  getTabs: AllItemsQuery_getTabs | null;
}

export interface AllItemsQueryVariables {
  poeInfo: PoeInfo;
  tabIndex?: number | null;
}
