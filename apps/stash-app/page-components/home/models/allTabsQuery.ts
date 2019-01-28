/* tslint:disable */
// This file was automatically generated and should not be edited.

import { PoeInfo } from "./../../../models/globalTypes";

// ====================================================
// GraphQL query operation: allTabsQuery
// ====================================================

export interface allTabsQuery_getTabs_tabs_color {
  __typename: "Color";
  r: number;
  g: number;
  b: number;
}

export interface allTabsQuery_getTabs_tabs {
  __typename: "Tab";
  index: number;
  name: string;
  color: allTabsQuery_getTabs_tabs_color;
}

export interface allTabsQuery_getTabs_items {
  __typename: "Item";
  baseName: string;
  image: string;
  stackSize: number | null;
}

export interface allTabsQuery_getTabs {
  __typename: "TabData";
  numTabs: number;
  tabs: allTabsQuery_getTabs_tabs[];
  items: allTabsQuery_getTabs_items[] | null;
}

export interface allTabsQuery {
  getTabs: allTabsQuery_getTabs | null;
}

export interface allTabsQueryVariables {
  poeInfo: PoeInfo;
  tabIndex?: number | null;
}
