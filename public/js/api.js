// api.js
export async function deletePost(postId) {
  try {
    const response = await fetch(`/posts/${postId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      window.location.href = '/';
    } else {
      alert('Failed to delete post');
    }
  } catch (err) {
    console.error(err);
    alert('Error deleting post');
  }
}
