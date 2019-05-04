import React from "react";
import styled from "@emotion/styled";
import { useStashTab } from "../../hooks/use-stash-tab";

const ItemStyles = styled.div`
    background-color: #455;
    overflow: auto;
`;

const Item = styled.span`
    color: #EFEFEF;
    background-color: #233;
    border: 4px solid #EFEFEF;
    margin: 10px;
    padding: 5px;
    float: left;
`;

const ItemsMessage = styled.p`
    margin-top: 4px;
`;

type Props = {
    tabIndex: number;
    tabName: string;
};
const ItemsForTab: React.FC<Props> = React.memo(({ tabIndex, tabName }) => {
    const { items, itemsLoading, error } = useStashTab(tabIndex);

    if (error) {
        return <ItemsMessage>{error}</ItemsMessage>;
    }

    if (itemsLoading) {
        return <ItemsMessage>Fetching items for tab <strong>{tabName}</strong>...</ItemsMessage>;
    }

    return (
        <ItemStyles>
            {items &&
                items.map((item, index) => (
                    <Item key={index}>
                        <img src={item.image} />
                        {item.baseName} {item.stackSize && "x"}{item.stackSize}
                    </Item>
                ))
            }
        </ItemStyles>
    );
});

export default ItemsForTab;
