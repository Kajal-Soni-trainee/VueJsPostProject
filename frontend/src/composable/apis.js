import fetchData from "./fetch";

const usersUrl = "https://jsonplaceholder.typicode.com/users";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";
const commentsUrl = `https://jsonplaceholder.typicode.com/comments?postId=`;
const albumUrl = "https://jsonplaceholder.typicode.com/albums";
const todosByUserIdUrl = `https://jsonplaceholder.typicode.com/users/`;
const photosByAlbumIdUrl = `https://jsonplaceholder.typicode.com/albums/`;

export const fetchUsers = async () => {
  return await fetchData(usersUrl);
};

export const fetchAllPosts = async () => {
  return await fetchData(postsUrl);
};

export const fetchAllCommentsById = async (postId) => {
  return await fetchData(commentsUrl + postId);
};

export const fetchAllAlbums = async () => {
  return await fetchData(albumUrl);
};

export const fetchTodosByUserId = async (id) => {
  return await fetchData(todosByUserIdUrl + `${id}/todos`);
};

export const fetchPhotosByAlbumId = async (id) => {
  return await fetchData(photosByAlbumIdUrl + `${id}/photos`);
};
