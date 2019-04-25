import React from "react";
import styled from "@emotion/styled";
import { AllItemsQuery_getTabs_tabs_color } from "../../models/AllItemsQuery";

type TabNameProps = AllItemsQuery_getTabs_tabs_color & { selected: boolean };
const TabName = styled.button<TabNameProps>`
    font-weight: bold;
	border-radius: 12% 12% 2% 2%;
	border: 1px solid black;
    text-align: center;
    padding: 7px;
    cursor: pointer;
    margin-right: 1px;
    margin-top: 5px;
    background-color: ${({ r, g, b }) => `rgb(${r} ${g} ${b})`};
	color: ${({ r, g, b}) => {
        const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b);
        return luma > 123.5 ? "black" : "gold";
    }};
    ${(props) => props.selected &&
        "transform: scaleY(1.1); transform-origin: bottom center;"
    }
    ${(props) => !props.selected &&
        "opacity: 0.65;"
    } `;

type Props = {
    name: string,
    color: AllItemsQuery_getTabs_tabs_color,
    selected: boolean,
    handleClick: () => void,
};

export const TabIcon: React.FC<Props> = React.memo(({ color, name, selected, handleClick }) => (
    <TabName onClick={handleClick} selected={selected} {...color}>{name}</TabName>
));
