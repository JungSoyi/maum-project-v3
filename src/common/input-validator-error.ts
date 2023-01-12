import { InternalServerErrorException } from "@nestjs/common";
import { GraphQLError, GraphQLErrorExtensions } from "graphql";
import { QueryFailedError } from "typeorm";

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

export class InvalidServerError extends InternalServerErrorException {
    constructor(objectOrError, descriptionOrOptions) {
        super(objectOrError);
        this.message = "message";
        this.name = "name";


    }
}