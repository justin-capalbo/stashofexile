import PoeColour from "./PoeColour";
import PoeItem from "./PoeItem";

type PoeTab = {
    n: string,
    i: number,
    type: string,
    colour: PoeColour,
    items?: PoeItem[],
};

export default PoeTab;
