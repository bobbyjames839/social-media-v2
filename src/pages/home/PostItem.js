import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/Firebase';


export const PostItem = (props) => {

  const [likes, setLikes] = useState(null);
  const {post} = props;
  const [user] = useAuthState(auth);

  const likesRef = collection(db, 'likes');

  const likesDoc = query(likesRef, where('postId', '==', post.id));

  const getLikes = async () => {
   const data = await getDocs(likesDoc);
   setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id})));
  }

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id});
      if (user) {
        setLikes((prev) => prev ? [...prev, {userId: user?.uid, likeId: newDoc.id}] : [{userId: user?.uid, likeId: newDoc.id}])
      }
    } catch (err) {
      console.log(err);
    }
  }

  const removeLike = async () => {
    try {
      const likeTodeleteQuery = query(likesRef, where('postId', '==', post.id), where('userId', '==', user?.uid));
      const likeToDeleteData = await getDocs(likeTodeleteQuery)
      const likeId = likeToDeleteData.docs[0].id;
      const likeTodelete = doc(db, 'likes', likeId)
      await deleteDoc(likeTodelete);
      if (user) {
        setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId ))
      }
    } catch (err) {
      console.log(err);
    }
  }

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

  useEffect(() => {
    getLikes();
  }, [])

  return (
    <div className='post'>
      <div className='post-top'>
        <img src={post.profilePic}/>
        <p>{post.username}</p>
      </div>

      <div className='post-middle'><img src={post.image}/></div>

      <div className='post-bottom'>
        <div className='post-bottom-inner'>
          <i className={hasUserLiked ? 'fa fa-heart like-button' : 'fa fa-heart-o like-button'} onClick={hasUserLiked ? removeLike : addLike}></i>
          <i className='fa fa-comment-o'></i>
        </div>

        {likes && likes.length > 0 && (<p>{likes.length === 1 ? '1 like' : `${likes.length} likes`}</p>)}

        <p>{post?.description}</p>
      </div>

    </div>
  )
  }