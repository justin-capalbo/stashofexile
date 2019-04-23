import React from "react";
import styled from "@emotion/styled";
import { SingleTabItemsQuery_getTabs_items } from "../../models/SingleTabItemsQuery";

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
    items: SingleTabItemsQuery_getTabs_items[],
};

const ItemsCollection: React.FC<Props> = React.memo(({ items }) => (
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
));

export default ItemsCollection;
