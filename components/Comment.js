import { css, Global } from '@emotion/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';

const inputComment = css`
  font-family: 'New Tegomin';
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 15px;
  width: 82%;
  margin: 0rem 0.2rem 0.2rem 3rem;
  padding: 0.3rem;
  text-align: center;
  border-radius: 0.5rem !important;
  border: white;
`;

// const guestListSmall = css`
//   margin: 0 0 1rem 0;
// `;

const title = css`
  text-align: center;
  font-size: 1.8rem;
  color: #a7766a;
  margin-top: 0.5rem;
`;

const mainChatBox = css`
  text-align: center;
  margin-right: 0 auto;
  margin-left: 0 auto;
  padding: 5px 70px;
`;

const button = css`
  color: #fff !important;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 0.6rem !important;
  margin-bottom: 0.7rem;
  margin-right: 0.1rem;
  padding: 0.2rem 0.2rem;
  border: none;
  border-radius: 0.2rem;
  background: rgb(150, 163, 131);
  transition: all 0.4s ease 0s;
  display: inline-block;
  :hover {
    background: rgb(150, 163, 131);
    letter-spacing: 3px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0 0, 0, 0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all 0.4s ease 0s;
  }
`;

const buttonDelete = css`
  color: #fff !important;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 0.6rem !important;

  margin-bottom: 0.7rem;
  padding: 0.2rem 0.2rem;
  display: inline-block;
  border: none;
  border-radius: 0.2rem;
  background: #a7766a;
  transition: all 0.4s ease 0s;
  :hover {
    background: red;
    letter-spacing: 3px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all 0.4s ease 0s;
  }
`;

const buttonPlus = css`
  color: #fff !important;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 1rem !important;
  margin-bottom: 0.7rem;
  margin-right: 0.1rem;
  padding: 0.4rem 0.6rem;
  border: none;
  border-radius: 0.2rem;
  background: rgb(150, 163, 131);
  transition: all 0.4s ease 0s;
  display: inline-block;
  :hover {
    background: rgb(150, 163, 131);
    letter-spacing: 3px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0 0, 0, 0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all 0.4s ease 0s;
  }
`;

const messageContainer = css`
  text-align: center;
  margin-right: 0;
  margin-left: 3.5rem !important;
  position: relative;
  width: 90%;
  word-wrap: break-word;
  margin: 10px 0;
  padding-left: 10px;
  background-color: white;
  border-radius: 0.4rem;
  /* background-color: #f1f7ed; */
`;

const faUserCircle = css`
  position: absolute;
  font-size: 2.5rem;
  margin: 0.9rem 0.5rem 0.5rem 0.9rem;

  top: 0;
  left: 0;
`;

const messageUser = css`
  margin: 1rem 0 0 2.3rem;
  padding-top: 0.4rem;
  font-weight: bold;
  font-size: 1.2rem;
`;

// const messageText = css`
//   font-size: 1.2rem;
//   margin: 3px 0;
//   background-color: lightgray;
// `;

const messageIconContainer = css`
  margin-top: 6px;
  margin-left: 2.3rem;
  font-size: 0.5rem;

  > * {
    display: inline-block;
    color: gray;
    margin-right: 10px;
    cursor: pointer;
    font-size: 1.1rem;
  }
`;

const arrowReplies = css`
  /* margin-top: 3px; */
  cursor: pointer;
  > * {
    color: #4688de;
    font-size: 1.1rem;
    display: inline-block;
    padding-bottom: 0.4rem;
  }
  > i {
    margin-right: 10px;
  }
`;

export default function App(props) {
  // Guest List input fields
  const [theComment, setTheComment] = useState('');
  const [addComment, setAddComment] = useState('');
  const [selectedComment, setSelectedComment] = useState('');
  const [edit, setEdit] = useState('');

  const [list, setList] = useState();

  // const handleCommentChange = (event) =>
  //   setTheComment(event.currentTarget.value);
  // const [arrowUp, setArrowUp] = useState(false);
  // const [openReply, setOpenReply] = useState(false);

  // const likeIcon = useRef;
  // const numLikes = useRef();

  // Toggled when CANCEL button and REPLY button are pressed
  // const changeOpeReply = () => {
  //   setOpenReply((prevState) => (prevState = !prevState));
  // };

  // // Toggle arrow up and down
  // let arrow = <i className="fas fa-caret-down" />;

  // const changeArrow = () => {
  //   setArrowUp((prevState) => (prevState = !prevState));
  // };

  // if (arrowUp) {
  //   arrow = <i className="fas fa-caret-up" />;
  // } else {
  //   arrow = <i className="fas fa-caret-down" />;
  // }

  // Like message
  // let toogleLike = false;
  // let likes = props.like;

  // const likeComment = () => {
  //   toogleLike = !toogleLike;
  //   if (toogleLike) {
  //     likes++;
  //     likeIcon.current.style.color = '#4688de';
  //   } else {
  //     likes--;
  //     likeIcon.current.style.color = 'gray';
  //   }
  //   numLikes.current.innerHTML = likes;
  // };

  // const deleteMessage = () => {};

  // Object.keys() returns an array of strings which are values of specific key of the object
  // const checkboxKeys = Object.keys(checkboxes);

  // fetch gets API from the server, will rerender nonStop, in this case runs only once because of useEffect
  // From GIT "GET"
  useEffect(() => {
    const getComments = async () => {
      const response = await fetch(`/api/comment`);
      const data = await response.json();
      setTheComment(data);
    };
    getComments();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    // create a new Comment POST
    async function newComment() {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: addComment,
          user_id: props.userId,
          restaurant_id: props.restaurantId,
          // username missing here
        }),
      });

      const createdGuest = await response.json();
      window.location.reload();
      return createdGuest;
    }
    newComment();
  }

  return (
    <div className="App">
      <header>
        <h1 css={title}>Comments Section</h1>
      </header>

      <section>
        <div css={mainChatBox}>
          <form onSubmit={handleSubmit}>
            <input
              css={inputComment}
              placeholder="Leave your Comment"
              id="Comment"
              onChange={(e) => setAddComment(e.target.value)}
            />
            <button css={buttonPlus}>+</button>
          </form>
        </div>
      </section>

      <div css={mainChatBox}>
        {theComment
          ? theComment.map((item) => (
              <div css={messageContainer} key={item.id}>
                <div css={messageUser}>username</div>
                <i css={faUserCircle} className="fas fa-user-circle" />

                <input
                  css={inputComment}
                  onChange={(e) => setSelectedComment(e.currentTarget.value)}
                  // I think the issue is here
                  value={item.comment}
                  disabled={edit ? 'disabled' : ''}
                />
                <section css={messageIconContainer}>
                  <i
                    className="fas fa-thumbs-up"
                    // ref={likeIcon}
                    // onClick={likeComment}
                    aria-hidden="true"
                  />

                  {/* {setSelectedComment(item)} */}
                  {/* <div ref={numLikes}>{props.likes}</div> */}
                  {/* <i className="fas fa-thumbs-down" /> */}
                  <button
                    css={buttonDelete}
                    type="button"
                    onClick={async (event) => {
                      event.preventDefault();
                      const response = await fetch(`/api/comment`, {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          id: item.id,
                        }),
                      });
                      console.log('infoRestaurantcheck', item.id);
                      const deletedComment = await response.json();
                      window.location.reload();
                      setSelectedComment(item);
                      return deletedComment;
                    }}
                  >
                    Delete
                  </button>

                  <button
                    css={button}
                    onClick={async (event) => {
                      event.preventDefault();
                      if (edit) {
                        // This is to allow changes
                        setEdit(false);
                      } else {
                        // This is to disable input and save changes
                        setEdit(true);
                        const response = await fetch(`/api/comment`, {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            comment: item.comment,
                            id: item.id,
                          }),
                        });
                        await response.json();
                      }
                    }}
                  >
                    {edit ? 'Edit Details' : 'Save Changes'}
                  </button>
                </section>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
