"use client";

import { UserItem } from "@/components/UserItem";
import { API_URL } from "@/constants";
import { IUser } from "@/shared/types/user.interface";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [likes, setLikes] = useState<number[]>([]);
  const [showLiked, setShowLiked] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
    const storedLikes = JSON.parse(localStorage.getItem("likes") || "[]");
    setLikes(storedLikes);
  }, []);

	// useEffect(() => {
  //   const onStorage = () => {
  //     const storedLikes = JSON.parse(localStorage.getItem("likes") || "[]");
  //     setLikes(storedLikes);
  //   };
  //   window.addEventListener("storage", onStorage);
  //   return () => window.removeEventListener("storage", onStorage);
  // }, []);

  const filteredUsers = useMemo(() => {
    if (!showLiked) return users;
    return users.filter((user) => likes.includes(user.id));
  }, [users, likes, showLiked]);

  return (
    <div>
      <button
        className="btn mb-4"
        onClick={() => {
          setShowLiked((prev) => !prev);
        }}
      >
        {showLiked ? "Показать всех" : "Показать только лайкнутых"}
      </button>
      {filteredUsers.map((user) => (
        <UserItem
          key={user.id}
          user={user}
					setLikes={setLikes}
        />
      ))}
    </div>
  );
}
