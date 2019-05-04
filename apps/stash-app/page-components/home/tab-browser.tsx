import React, { useState, useContext, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import gql from "graphql-tag";
import { useQuery, useApolloClient } from "react-apollo-hooks";
import ItemsCollection from "./items-collection";
import { TabPicker } from "./tab-picker";
import { AccountContext } from "../../context";
import { AccountInfoQuery_getTabs_tabs } from "../../models/AccountInfoQuery";
import { SingleTabItemsQuery, SingleTabItemsQueryVariables, SingleTabItemsQuery_getTabs_items } from "../../models/SingleTabItemsQuery";

const TabStyles = styled.div`
    margin: 15px;
    text-align: center;
`;

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

type Props = {
    tabData: AccountInfoQuery_getTabs_tabs[];
};

export const TabBrowser: React.FC<Props> = React.memo(({ tabData }) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [items, setItems] = useState<SingleTabItemsQuery_getTabs_items[]>([]);
    const [itemsLoaded, setItemsLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const { poeCreds } = useContext(AccountContext);
    const client = useApolloClient();

    const fetchData = useCallback(async () => {
        setLoading(true);
        const res = await client.query<SingleTabItemsQuery, SingleTabItemsQueryVariables>({
            query: SINGLE_TAB_ITEMS_QUERY,
            variables: {
                poeInfo: poeCreds,
                tabIndex: selectedTab,
            },
        });
        if (res.data.getTabs) {
            setItems(res.data.getTabs.items);
            setItemsLoaded(true);
            setLoading(false);
        }
    }, [selectedTab]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <TabStyles>
            {itemsLoaded &&
                <>
                    <TabPicker tabs={tabData} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                    {loading
                        ? <p>Loading...</p>
                        : <ItemsCollection items={items} />
                    }
                </>
            }
        </TabStyles>
    );
});
