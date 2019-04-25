/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PoeInfo } from "./globalTypes";

// ====================================================
// GraphQL query operation: SingleTabItemsQuery
// ====================================================

export interface SingleTabItemsQuery_getTabs_items {
  __typename: "Item";
  image: string;
  baseName: string;
  stackSize: number | null;
}

export interface SingleTabItemsQuery_getTabs {
  __typename: "TabData";
  items: SingleTabItemsQuery_getTabs_items[] | null;
}

export interface SingleTabItemsQuery {
  getTabs: SingleTabItemsQuery_getTabs | null;
}

export interface SingleTabItemsQueryVariables {
  poeInfo: PoeInfo;
  tabIndex?: number | null;
}
