import gql from "graphql-tag";
export const MENUCOLLAPSESTATE = gql`
query  menuState($id:ID!){
    state(id:$id)
}
`;
