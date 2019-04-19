/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PoeInfo } from "./globalTypes";

// ====================================================
// GraphQL query operation: AccountInfoQuery
// ====================================================

export interface AccountInfoQuery_getTabs {
  __typename: "TabData";
  numTabs: number;
}

export interface AccountInfoQuery {
  getTabs: AccountInfoQuery_getTabs | null;
}

export interface AccountInfoQueryVariables {
  poeInfo: PoeInfo;
  tabIndex?: number | null;
}
