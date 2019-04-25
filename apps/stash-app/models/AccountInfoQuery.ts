/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PoeInfo } from "./globalTypes";

// ====================================================
// GraphQL query operation: AccountInfoQuery
// ====================================================

export interface AccountInfoQuery_getTabs_tabs_color {
  __typename: "Color";
  r: number;
  g: number;
  b: number;
}

export interface AccountInfoQuery_getTabs_tabs {
  __typename: "Tab";
  name: string;
  index: number;
  color: AccountInfoQuery_getTabs_tabs_color;
}

export interface AccountInfoQuery_getTabs {
  __typename: "TabData";
  numTabs: number;
  tabs: AccountInfoQuery_getTabs_tabs[];
}

export interface AccountInfoQuery {
  getTabs: AccountInfoQuery_getTabs | null;
}

export interface AccountInfoQueryVariables {
  poeInfo: PoeInfo;
  tabIndex?: number | null;
}
