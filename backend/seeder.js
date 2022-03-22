
import dotnv from 'dotenv'
import { posts, users } from "./data/dummyData.js";
import Post from "./models/postModel.js";
import User from "./models/userModels.js";
import ConnectDB from './db/ConnectDB.js'
dotnv.config()
ConnectDB()
const importData = async () => {
  try {
    await Post.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const id = createdUsers[0]._id;

    const newPosts = posts.map((post) => {
      return { ...post, userId: id };
    });

    await Post.insertMany(newPosts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Post.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
