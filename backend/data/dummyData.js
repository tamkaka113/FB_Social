import bcrypt from "bcryptjs";
export const users = [
  {
    profilePicture: "assets/person/1.jpeg",
    username: "Safak Kocaoglu",
    email: "tamkaka113@gmail.com",
    password: bcrypt.hashSync("12346", 10),
  },
  {
    profilePicture: "assets/person/2.jpeg",
    username: "Janell Shrum",
    email: "tamkaka114@gmail.com",
    password: bcrypt.hashSync("12346", 10),
  },
  {
    profilePicture: "assets/person/3.jpeg",
    username: "Alex Durden",
    email: "tamkaka115@gmail.com",
    password: bcrypt.hashSync("12346", 10),
  },
];

export const posts = [
  {
    desc: "Love For All, Hatred For None.",
    image: "assets/post/1.jpeg",
  },
  {
    image: "assets/post/2.jpeg",
    desc: "Love For All, Hatred For None.",
  },
  {
    desc: "Every moment is a fresh beginning.",
    image: "assets/post/3.jpeg",
  },
  {
    image: "assets/post/4.jpeg",
  },
];
