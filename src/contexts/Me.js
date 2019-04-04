import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const Me = gql`
    query me {
        me {
            id
            name
            username
        }
    }
`;


const MeContext = React.createContext();

class MeProvider extends React.PureComponent {
    render(){
        return (
            <Query query={Me}>
            {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                return (
                    <MeContext.Provider
                    value={{
                        user: data.me,
                    }}
                    >
                        {this.props.children}
                    </MeContext.Provider>
                )}}
            </Query>
        )
    }
}

const MeConsumer = MeContext.Consumer;

export default MeProvider;
export { MeConsumer };

