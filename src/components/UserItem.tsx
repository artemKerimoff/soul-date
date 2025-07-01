import { IUser } from "@/shared/types/user.interface";
import { LikeButton } from "./LikeButton";

interface Props {
  user: IUser;
	setLikes: (likes: number[]) => void;
}

export function UserItem({ user, setLikes }: Props) {
  return (
    <div className="border border-white/10 rounded-xl p-4 bg-black text-white shadow-md my-2 mx-2">
      <h2 className="text-xl font-bold mb-2">{user.name}</h2>
      <p className="text-gray-400">Phone: {user.phone}</p>
      <p className="text-gray-400">Email: {user.email}</p>
      <LikeButton
        id={user.id}
        setLikes={setLikes}
      />
    </div>
  );
}
