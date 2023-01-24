import { Injectable } from "@nestjs/common";
import { ApolloError } from "apollo-server-express";
import { GraphQLError } from "graphql";

@Injectable()
export class ExceptionService {
    apolloServerException(data: { code, message }): ApolloError {
        return new GraphQLError(data.message, {
            extensions: {
                code: data.code
            },
        });
    }
}