import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import { Box, Divider, IconButton, Typography, useTheme, TextareaAutosize,Button} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfilePage from "scenes/profilePage";
import { setPost } from "state";
// import axios from "axios";
// import ProfilePage from "scenes/profilePage";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  isProfile = false,
  userId,
  setDelete
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const { _id } = useSelector((state) => state.user);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const currentUser = _id === userId;

  const patchLike = async () => {
    const response = await fetch(`https://social-mernback-1.onrender.com/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const [isComments, setIsComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState(Array.isArray(comments) ? comments : []);

  const handleCommentToggle = async () => {
    setIsComments(!isComments);
    if (!isComments) {
      try {
        const response = await fetch(`https://social-mernback-1.onrender.com/posts/${postId}/comments`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const commentsData = await response.json();
        setPostComments(Array.isArray(commentsData) ? commentsData : []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
  };

  const handleDeleteProperty = async (postId) => {
    try {
      const response = await fetch(`https://social-mernback-1.onrender.com/posts/delete/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error deleting property: ${response.status}`);
      }

      alert('Property deleted successfully!');
      setDelete(true);

    } catch (error) {
      console.error('Error deleting property:', error.message);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(`https://social-mernback-1.onrender.com/posts/${postId}/comment`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId, commentText }),
      });
      
      const updatedPost = await response.json();
      setPostComments(Array.isArray(updatedPost.comments) ? updatedPost.comments : []);
      setCommentText('');
      console.log('Comment submitted successfully!');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`https://social-mernback-1.onrender.com/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={handleCommentToggle}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{postComments.length}</Typography>
          </FlexBetween>
          {isProfile && currentUser && 
        <button onClick={() => handleDeleteProperty(postId)}>
         Delete
        </button>
      }
        </FlexBetween>

        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(`https://social-mernback-1.onrender.com/profile/${postUserId}`)
              .then(() => {
                alert('Link copied to clipboard');
              })
              .catch(err => {
                console.error('Could not copy text: ', err);
              });
          }}
        >
        <ShareOutlined />
      </IconButton>


      </FlexBetween>

        {isComments && (
              <div style={{display:"flex",paddingLeft:"10px"}}>
                <TextareaAutosize
                  minRows={1}
                  placeholder="Enter your comment..."
                  required
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  style={{
                      width: '65%',
                      padding: '10px',
                      fontSize: '16px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      resize: 'none',
                      outline: 'none',
                    }}
                />
                <div style={{paddingLeft:'20px'}}>
                <Button 
                    variant="contained" 
                    size="small" 
                    endIcon={<SendIcon />}
                    sx={{
                        '&:hover': {
                          backgroundColor: '#bcd7ff',
                        },
                      }}
                      onClick={handleCommentSubmit} 
                    >
                  Send
                </Button>
                </div>
        
              </div>
            )}



      {isComments && (
        <Box mt="0.5rem">
          {postComments
            .slice()
            .reverse() // Reverse the order to show newest comment first
            .map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                <strong>{comment.userName} : </strong>{comment.commentText}
                </Typography>
              </Box>
            ))}
          <Divider />
        </Box>
      )}

    </WidgetWrapper>
  );
};

export default PostWidget;
