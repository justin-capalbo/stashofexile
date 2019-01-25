/* tslint:disable */
// This file was automatically generated and should not be edited.

import { PoeInfo } from "./../../../models/globalTypes";

// ====================================================
// GraphQL query operation: tabCountQuery
// ====================================================

export interface tabCountQuery_getTabs_tabs {
  __typename: "Tab";
  index: number;
  name: string;
  type: string;
}

export interface tabCountQuery_getTabs {
  __typename: "TabData";
  numTabs: number;
  tabs: tabCountQuery_getTabs_tabs[];
}

export interface tabCountQuery {
  getTabs: tabCountQuery_getTabs | null;
}

export interface tabCountQueryVariables {
  poeInfo: PoeInfo;
}
