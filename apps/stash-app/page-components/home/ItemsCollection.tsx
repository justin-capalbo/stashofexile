import React from "react";
import styled from "@emotion/styled";
import { allTabsQuery_getTabs_items } from "./models/allTabsQuery";

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

type Props = {
    items: allTabsQuery_getTabs_items[],
};

const ItemsCollection: React.FC<Props> = React.memo(({ items }) => (
    <ItemStyles>
    {items.map((item, index) => (
        <Item key={index}>
            <img src={item.image} />
            {item.baseName} {item.stackSize && "x"}{item.stackSize}
        </Item>
    ))}
    </ItemStyles>
));

export default ItemsCollection;
