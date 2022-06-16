import { useMutation } from "react-query";
import { GraphQLClient } from "graphql-request";
import { useAuth } from "../context/authContext";

export const useGQLMutation = (query, configs = {}) => {
  const { userToken } = useAuth();
  let endPoint = process.env.REACT_APP_PRODUCTION_SERVER;

  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };

  const graphQlClient = new GraphQLClient(endPoint, headers);

  const makeMutation = async (variables) =>
    await graphQlClient.request(query, variables);

  // const makeMutation = async (variables) => await request(endPoint, query, variables);

  return useMutation(makeMutation, configs);
};
