import { useContext } from "react"
import { useCallback } from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { NotFound } from "../../components/NotFound/NotFound"
import { Post } from "../../components/Post/post"
import Spinner from "../../components/Spinner"
import { CardContext } from "../../context/cardContext"
import { useApi } from "../../hooks/useApi"
import api from "../../utils/api"
import { Box } from "@mui/material"



export const PostPage = () => {
    const { postId } = useParams();
    const { handleLike} = useContext(CardContext);
    const [comment,setComment] = useState([])
    

    const handleGetPost = useCallback(() => api.getPostById(postId), [postId]);

    const {
      data: post, 
      setData: setPost, 
      loading: isLoading, 
      error: errorState
    } = useApi(handleGetPost)

    useEffect(() => {
      if (postId) {
        api.
        getPostComments(postId)
          .then((postComents) => {
            setComment(postComents);
          })
          .catch((err) => console.log(err))
      }
        
    }, [postId,setComment]);


    const handlePostLike = useCallback(() => {  
        handleLike(post).then((updatePost)=> {
          setPost(updatePost);
        });
    },[post, handleLike, setPost]) 
    

    return (
        <Box sx={{transform:'translate(0%,35px)',pb:'50px'}}>
            {isLoading 
              ?<Spinner/>
              : !errorState && <Post {...post} postId={postId} setPost={setPost} comment={comment} setComment={setComment} onProductLike={handlePostLike}/>
            }
            {!isLoading && errorState && <NotFound/>}
      </Box>
    )
}