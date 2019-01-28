type PoeItem = {
    typeLine: string,
    name: string,
    icon: string,
    category: string[],
    stackSize?: number,
    maxStackSize?: number,
};

export default PoeItem;
