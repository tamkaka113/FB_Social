import axios from "axios";

export const handleUserId = (users) => {
  let newUsers = [];

  for (const user of users) {
    newUsers.push(user?._id);
  }

  const showedUsers = [...new Set(newUsers)];

  return showedUsers;
};

export const handleUserIdByCon = (conversations, id) => {
  let newUsers = [];
  for (const c of conversations) {
    const userId = c.members.find((m) => m !== id);

    newUsers.push(userId);
  }
  const showedUsers = [...new Set(newUsers)];

  return showedUsers;
};

export const handleImages = async (e, setImages) => {
  const files = Array.from(e.target.files);

  try {
    const requests = files.map((file) => {
      const formData = new FormData();
      formData.append("image", file);
      return axios.post(`/api/v1/posts/uploads`, formData);
    });

    const responses = await Promise.all(requests);

    const data = responses.map((response) => {
      return response.data;
    });

    setImages(data);
  } catch (error) {
    console.error(error);
  }
};
