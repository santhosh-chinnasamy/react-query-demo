import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const gender = ["male", "female"];
const status = ["active", "inactive"];
const random = (array) => array[Math.floor(Math.random() * array.length)];

export default function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const createUser = async (input) => {
    Object.assign(input, { gender: random(gender), status: random(status) });

    const response = await axios.post(
      "https://gorest.co.in/public/v1/users",
      input,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        },
      }
    );

    setMessage(response.data);
  };

  const { isLoading, error, isError, mutate } = useMutation(createUser, {
    onSuccess: async () => queryClient.invalidateQueries("users"),
  });

  return (
    <>
      <h1>Create a new user</h1>
      <form className="user" onSubmit={(e) => e.preventDefault()}>
        <div className="input">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />
        <div className="input">
          <button onClick={() => mutate({ name, email })}>Create</button>
        </div>
      </form>
      <p> Created a new User : {message && JSON.stringify(message?.data)}</p>

      <div style={{ color: isError ? "red" : "green" }}>
        {isLoading ? "saving.." : ""}
        {isError ? error.message : ""}
      </div>
    </>
  );
}
