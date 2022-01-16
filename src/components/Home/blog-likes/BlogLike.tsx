import { useState, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { Button } from "react-bootstrap";

interface BlogLikeProps {
  defaultLikes: string[]
  onChange: (x: string)=> void
}

const yourUserId: string = "123"
export default function BlogLike({ defaultLikes, onChange }: BlogLikeProps) {
    const [likes,setLikes] = useState<any>(defaultLikes)
    const iLikedThisArticle = likes.includes(yourUserId)
  const toggleLike = () => {
      if(iLikedThisArticle){
          setLikes(likes.filter((id: string) => id !== yourUserId))
      }
      else{
            setLikes([...likes,yourUserId])
      }
      onChange&&onChange(likes);
  };
  useEffect(() => {
    onChange&&onChange(likes);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[iLikedThisArticle])
  return (
    <div >
      <Button className="shareComment mode" onClick={toggleLike} variant={iLikedThisArticle?"dark":"dark-outline"}>
        <AiOutlineLike /> {`${likes.length} `}
      </Button>{" "}
    </div>
  );
}
