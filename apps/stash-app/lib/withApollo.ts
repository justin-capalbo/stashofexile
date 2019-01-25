import settings from "../config";
import withApollo, { InitApolloOptions } from "next-with-apollo";
import ApolloClient from "apollo-boost";

function createClient({ headers }: InitApolloOptions<any>): ApolloClient<any> {
	return new ApolloClient({
		uri: settings.gqlEndpoint,
		request: (operation): any => {
			operation.setContext({
			fetchOptions: {
				credentials: "include",
			},
			headers,
			});
		},
	});
}

export default withApollo(createClient);
