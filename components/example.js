<button
  css={button}
  onClick={async () => {
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
        }),
      });
      await response.json();
    }
  }}
>
  {edit ? 'Edit Details' : 'Save Changes'}
</button>;

// Delete a Comment DELETE

// function handleDelete() {
//   async function deleteComment() {
//     // console.log('thecommentidselected', selectedComment);
//     // console.log('thecommentid', theComment);

//     const response = await fetch(`/api/comment`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         id: selectedComment,
//       }),
//     });

//     const deletedGuest = await response.json();

//     window.location.reload();
//     return deletedGuest;
//   }
//   deleteComment();
// }

// Edit a Comment PATCH

// function handleEdit() {
//   async function editComment() {
//     const response = await fetch(`/api/comment`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         attending: true,
//       }),
//     });

//     const updatedGuest = await response.json();

//     window.location.reload();
//     return updatedGuest;
//   }
//   editComment();
// }
