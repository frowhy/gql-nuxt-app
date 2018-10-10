import {ApolloClient} from 'apollo-client';

export declare class ApolloHelpers<S> {
    async onLogin(token: String, apolloClient?: ApolloClient, tokenExpires?: Number): Promise;

    async onLogout(): Promise;

    getToken(): VoidFunction;
}
