import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
// import { WebSocketLink } from 'apollo-link-ws'
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import cookie from 'cookie';
import withApollo from 'next-with-apollo';

function parseCookies(req?: any, options = {}) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie, options);
}

export default withApollo(({ headers = {} }) => {
  const ssrMode = !process.browser;

  const httpLink = new HttpLink({
    uri: 'http://localhost:4000',
    credentials: 'include',
  });

  // const wsLink = !ssrMode && new WebSocketLink({
  //   uri: WS_URL,
  //   options: {
  //     reconnect: true,
  //     connectionParams: {
  //       authorization: headers.authorization
  //     }
  //   }
  // })

  const contextLink = setContext(async (request, _previousContext) => {
    const req = request.context;
    const token = parseCookies(req).qid;
    return {
      headers: {
        ...headers,
        cookie: token ? `qid=${token}` : '',
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(err => console.log(`[GraphQL error]: Message: ${err.message}`));
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  let link = ApolloLink.from([errorLink, contextLink, httpLink]);

  if (!ssrMode) {
    link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      // wsLink,
      link
    );
  }

  const cache = new InMemoryCache({
    dataIdFromObject: ({ id, __typename }) => (id && __typename ? __typename + id : null),
  });

  return new ApolloClient({
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
    link,
    ssrMode,
    cache,
  });
});
