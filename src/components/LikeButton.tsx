import { useEffect, useState } from "react";

interface Props {
  id: number;
	setLikes: (likes: number[]) => void;
}

export function LikeButton({ id, setLikes }: Props) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem("likes") || "[]");
    setIsLiked(likes.includes(id));
  }, [id]);

  const handleLike = () => {
    let likes = JSON.parse(localStorage.getItem("likes") || "[]");
    if (likes.includes(id)) {
      likes = likes.filter((likeId: number) => likeId !== id);
      setIsLiked(false);
    } else {
      likes.push(id);
      setIsLiked(true);
    }
    localStorage.setItem("likes", JSON.stringify(likes));
		setLikes(likes);	
  };

  return (
    <button
      onClick={handleLike}
      className="btn"
    >
      {isLiked ? "❤️" : "🤍"}
    </button>
  );
}
