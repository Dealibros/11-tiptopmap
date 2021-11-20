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
