"use client";

import { useGetUserQuery } from "@/api/user/api";
import { useEffect, useRef, useState } from "react";

const UsersList = [
  {
    id: 1,
    name: "John Doe 1",
    email: "john.doe1@example.com",
  },
  {
    id: 2,
    name: "Jane Doe 2",
    email: "jane.doe2@example.com",
  },
  {
    id: 3,
    name: "John Doe 3",
    email: "john.doe3@example.com",
  },
];

const Users = () => {
  const [selectedUser, setSelectedUser] = useState<
    (typeof UsersList)[0] | null
  >(null);

  const [pervId, setPervId] = useState<number | null>(null);
  const abort = useRef<AbortController | null>(null);
  const { data, isLoading } = useGetUserQuery(selectedUser?.id, abort?.current);

  useEffect(() => {
    if (data) {
      setPervId(null);
    }
  }, [data]);

  useEffect(() => {
    if (!pervId) return;
    const controller = new AbortController();
    abort.current = controller;

    return () => {
      controller.abort();
    };
  }, [selectedUser, pervId]);
  return (
    <section>
      <div>list:</div>
      {UsersList.map((el) => {
        return (
          <p
            key={el.id}
            onClick={() => {
              setPervId(selectedUser?.id || null);
              setSelectedUser(el);
            }}
            className={`${
              selectedUser?.id === el.id ? "border border-blue-400" : ""
            }`}
          >
            {el.name} <span>{el.email}</span>
          </p>
        );
      })}
    </section>
  );
};

export default Users;
