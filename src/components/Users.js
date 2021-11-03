import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import User from "./User";

export default function Users() {
  const fetchUsers = async () => {
    const response = await axios.get(
      `https://gorest.co.in/public/v1/users?page=66`
    );
    return response.data;
  };

  const { data, isLoading, error, isError } = useQuery("users", fetchUsers, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error {error.message}</p>;
  return (
    <div className="container">
      <User />
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
          {data?.data?.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id} </td>
                <td>{user.name} </td>
                <td>{user.email} </td>
                <td>{user.status} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
