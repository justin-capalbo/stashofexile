import { GraphQLServer} from "graphql-yoga";
import { Query } from "./resolvers";

// Create the GraphQL Yoga Server
function createServer() {
	return new GraphQLServer({
		typeDefs: "src/schema.graphql",
		resolvers: {
			Query,
		} as any,
		resolverValidationOptions: {
			requireResolversForResolveType: false,
		},
		context: {

		},
	});
}

export default createServer;
