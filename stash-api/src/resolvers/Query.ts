import { PoeTab } from "../models";

type Creds = {
	poeSessId: string,
	accountName: string,
	league: string
}

type Tab = {
	name: string,
	index: number,
	type: string,
	color: Color
}

type Color = {
	r: number,
	g: number,
	b: number
}

const Query = {
	hello: () => "world",
	tabs: (parent: any, ctx: any, args: Creds): [Tab] => {
		return [{
			name: "hello",
			index: 1,
			type: "Currency",
			color: {
				r: 1,
				g: 2,
				b: 3,
			},
		}];
	},
};

export default Query;
