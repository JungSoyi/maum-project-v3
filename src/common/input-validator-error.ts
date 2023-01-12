import { GraphQLError, GraphQLErrorExtensions } from "graphql";

export class InputValidationError extends GraphQLError {
    extensions: GraphQLErrorExtensions;
    constructor(message: string, field: string) {
        super(message);
        this.extensions = {
            statusCode: 500,
            code: "Input validation failed",
            field,
        };
    }
}
