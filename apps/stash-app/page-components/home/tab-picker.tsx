import React from "react";
import styled from "@emotion/styled";
import { AccountInfoQuery_getTabs_tabs, AccountInfoQuery_getTabs_tabs_color } from "../../models/AccountInfoQuery";

type TabIconProps = AccountInfoQuery_getTabs_tabs_color & { selected: boolean };
const TabIcon = styled.button<TabIconProps>`
    font-weight: bold;
	border-radius: 12% 12% 2% 2%;
	border: 1px solid black;
    text-align: center;
    padding: 7px;
    cursor: pointer;
    margin-right: 1px;
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
    tabs: AccountInfoQuery_getTabs_tabs[],
    selectedTab: number,
    setSelectedTab: (tabIndex: number) => void,
};
export const TabPicker: React.FC<Props> = React.memo(({ tabs, selectedTab, setSelectedTab }) => (
    <>
        {tabs.map((tab) => (
            <TabIcon
                key={tab.index}
                {...tab.color}
                selected={tab.index === selectedTab}
                onClick={() => setSelectedTab(tab.index)}
            >
                {tab.name}
            </TabIcon>
        ))}
    </>
));
