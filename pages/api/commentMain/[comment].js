import '../../../util/database';
import {
  createComment,
  deleteComment,
  getComment,
  getUserByValidSessionToken,
  updateComment,
} from '../../../util/database';

// GET

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const restaurantId = Number(req.query.comment);
    const commentsdata = await getComment(restaurantId);

    const theUser = await getUserByValidSessionToken(req.cookies.sessionToken);
    const theUserId = theUser.id;

    const newArray = commentsdata.map((commentObj) => {
      if (theUserId === commentObj.userId) {
        commentObj.isLocked = true;
      } else {
        commentObj.isLocked = false;
      }
      return { ...commentObj };
    });

    return res.status(200).json(newArray);

    // POST
  } else if (req.method === 'POST') {
    const body = req.body;
    console.log('bodyfromComment', body);
    const createCommentData = await createComment({
      comment: body.comment,
      restaurant_id: body.restaurant_id,
      user_id: body.user_id,
      username: body.username,
    });

    return res.status(200).json(createCommentData);

    // PUT
  } else if (req.method === 'PUT') {
    const body = req.body;
    const comment = await updateComment({
      comment: body.comment,
      id: body.id,
    });

    return res.status(200).json({ comment });

    // DELETE
  } else if (req.method === 'DELETE') {
    const body = req.body;
    const id = body.id;
    console.log('bodyrestaurant', body);
    if (id) {
      await deleteComment(id);
    }
  }

  if (Array.isArray()) {
    return res.status(405).json;
  }

  return res.status(200).json();
}
