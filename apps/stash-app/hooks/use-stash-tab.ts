import { useState, useContext, useEffect } from "react";
import { useApolloClient } from "react-apollo-hooks";
import gql from "graphql-tag";
import {
    SingleTabItemsQuery_getTabs_items,
    SingleTabItemsQuery,
    SingleTabItemsQueryVariables
} from "../models/SingleTabItemsQuery";
import { AccountContext } from "../context";
import { GraphQLError } from "graphql";

const SINGLE_TAB_ITEMS_QUERY = gql`
    query SingleTabItemsQuery($poeInfo: PoeInfo!, $tabIndex: Int) {
        getTabs(poeInfo: $poeInfo, tabIndex: $tabIndex) {
            items {
                image
                baseName
                stackSize
            }
        }
    }
`;

/**
 * Searches for item information in a stash tab by its' index.
 * Requires both Apollo and Account context providers in the parent component tree.
 * @param selectedTab The index of the desired tab
 */
export const useStashTab = (selectedTab: number) => {
    const client = useApolloClient();
    const { poeCreds } = useContext(AccountContext);
    const [items, setItems] = useState<SingleTabItemsQuery_getTabs_items[]>([]);
    const [loading, setLoading] = useState(false);
    const [itemsLoaded, setItemsLoaded] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await client.query<SingleTabItemsQuery, SingleTabItemsQueryVariables>({
                    query: SINGLE_TAB_ITEMS_QUERY,
                    variables: {
                        poeInfo: poeCreds,
                        tabIndex: selectedTab,
                    },
                });
                if (data.getTabs) {
                    setItems(data.getTabs.items);
                    setItemsLoaded(true);
                }
            } catch (error) {
                setError("Error loading stash tab.");
            } finally {
                setLoading(false);
            }

        };
        fetchData();
    }, [selectedTab]);

    return {
        itemsLoading: loading,
        itemsLoaded,
        items,
        error,
    };
};
