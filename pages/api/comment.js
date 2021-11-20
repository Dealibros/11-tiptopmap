import '../../util/database';
import {
  createComment,
  deleteComment,
  getComment,
  updateComment,
} from '../../util/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const commentsdata = await getComment();

    return res.status(200).json(commentsdata);
  } else if (req.method === 'POST') {
    const body = req.body;

    console.log('bodyfromComment', body);

    const createCommentData = await createComment({
      comment: body.comment,
      restaurant_id: body.restaurant_id,
      user_id: body.user_id,
    });

    return res.status(200).json(createCommentData);

    // delete comments
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
