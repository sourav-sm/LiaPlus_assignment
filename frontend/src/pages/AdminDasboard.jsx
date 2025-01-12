import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [editPost, setEditPost] = useState(null);

  const token = localStorage.token;

  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:4000/api/blogs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setPosts(res.data));
    } else {
      console.log('Unauthorized');
    }
  }, [token]);

  const handleDelete = (id) => {
    if (token) {
      axios
        .delete(`http://localhost:4000/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => setPosts(posts.filter((post) => post._id !== id)));
    } else {
      console.log('Unauthorized');
    }
  };

  const handleCreate = () => {
    if (token && newPost.title && newPost.content) {
      axios
        .post(
          'http://localhost:4000/api/blogs',
          {
            title: newPost.title,
            content: newPost.content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setPosts([...posts, res.data.blog]);
          setNewPost({ title: '', content: '' });
        })
        .catch((err) => console.log(err));
    } else {
      console.log('Unauthorized or invalid input');
    }
  };

  const handleEdit = (id) => {
    const postToEdit = posts.find((post) => post._id === id); // Use _id
    setEditPost(postToEdit);
  };

  const handleUpdate = () => {
    if (token && editPost) {
      axios
        .put(
          `http://localhost:4000/api/blogs/${editPost._id}`, // Correct API endpoint
          {
            title: editPost.title,
            content: editPost.content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setPosts(
            posts.map((post) =>
              post._id === res.data.blog._id ? res.data.blog : post
            )
          );
          setEditPost(null);
        })
        .catch((err) => console.log(err));
    } else {
      console.log('Unauthorized or invalid input');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setEditPost({ title: '', content: '' })}
          className="bg-green-500 text-white px-6 py-3 rounded-md mb-6 hover:bg-green-600 transition"
        >
          Create New Post
        </button>

        {/* New Post Form */}
        {(editPost === null || editPost === undefined) && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-2xl font-semibold mb-4">Create a New Post</h3>
            <input
              type="text"
              placeholder="Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="border p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Content"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="border p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCreate}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
            >
              Create Post
            </button>
          </div>
        )}

        {/* Edit Post Form */}
        {editPost && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-2xl font-semibold mb-4">Edit Post</h3>
            <input
              type="text"
              value={editPost.title}
              onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
              className="border p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <textarea
              value={editPost.content}
              onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
              className="border p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              onClick={handleUpdate}
              className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition"
            >
              Update Post
            </button>
          </div>
        )}

        {/* Posts List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleDelete(post._id)} // Use _id
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(post._id)} // Use _id
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
