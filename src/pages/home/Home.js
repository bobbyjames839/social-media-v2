import { getDocs, collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/Firebase";
import { PostItem } from "./PostItem";
import '../../styles/Home.css'

export const Home = () => {

  const [postsList, setPostsList] = useState(null);
  const postsRef = collection(db, 'posts');

  const getPosts = async () => {
    const data = await getDocs(postsRef); 
    setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  }

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <div className="home">
      <div className="posts">
        {postsList?.map((post) => (
          <PostItem post={post}/>
        ))}
      </div>
    </div>  
  )
}