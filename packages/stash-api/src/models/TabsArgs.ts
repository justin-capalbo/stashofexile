type PoeInfo = {
    poeSessId: string,
    accountName: string,
    league: string,
};

type TabsArgs = {
    poeInfo: PoeInfo,
    tabIndex: number,
};

export default TabsArgs;
