// Creating the end point

import { getRestaurant } from '../../../util/database';

// export async function handler2(req, res) {
//   if (req.method === 'GET') {
//     const body = req.body;
//     console.log('whatshere?', body);
//     console.log('whatshere?', req.query.restaurantId);
//     const commentsdata = await getComment(body.restaurantId);

//     return res.status(200).json(commentsdata);
//     // POST
//   } else if (req.method === 'POST') {
//     const body = req.body;
//     console.log('bodyfromComment', body);
//     const createCommentData = await createComment({
//       comment: body.comment,
//       restaurant_id: body.restaurant_id,
//       user_id: body.user_id,
//       username: body.username,
//     });

//     return res.status(200).json(createCommentData);

//     // PUT
//   } else if (req.method === 'PUT') {
//     const body = req.body;
//     console.log('bodyPut', body);
//     const comment = await updateComment({
//       comment: body.comment,
//       id: body.id,
//     });

//     return res.status(200).json({ comment });

//     // DELETE
//   } else if (req.method === 'DELETE') {
//     const body = req.body;
//     const id = body.id;
//     console.log('bodyrestaurant', body);
//     if (id) {
//       await deleteComment(id);
//     }
//   }

//   if (Array.isArray()) {
//     return res.status(405).json;
//   }

//   return res.status(200).json();
// }

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const restaurant = await getRestaurant(req.query.restaurantId);

    res.status(200).json(restaurant);
  } else if (req.method === 'PATCH') {
    const body = req.body;

    console.log('from api body', req.body);

    // return res.status(200).json(updateCardata);
  }
  return res.status(405);
}
