import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Articles from "../../model/articles";
import UserController from "../../controllers/article";

const aid1 = new mongoose.Types.ObjectId();
const aid2 = new mongoose.Types.ObjectId();
const aid3 = new mongoose.Types.ObjectId();
const aid4 = new mongoose.Types.ObjectId();
const aid5 = new mongoose.Types.ObjectId();
const aid6 = new mongoose.Types.ObjectId();
const aid7 = new mongoose.Types.ObjectId();
const aid8 = new mongoose.Types.ObjectId();
const aid9 = new mongoose.Types.ObjectId();

const aIds = { aid1, aid2, aid3, aid4, aid5, aid6, aid7, aid8, aid9 };

async function createArticles() {

  const articles = [
    {
      _id: aid1,
      title: "ArticleI",
      description: "Article1"
    },
    {
      _id: aid2,
      title: "ArticleII",
      description: "Article2"
    },
    {
      _id: aid3,
      title: "ArticleIII",
      description: "Article3"
    },
    {
      _id: aid4,
      title: "ArticleIV",
      description: "Article4"
    },
    {
      _id: aid5,
      title: "ArticleV",
      description: "Article5"
    },
    {
      _id: aid6,
      title: "ArticleVI",
      description: "Article6"
    },
    {
      _id: aid7,
      title: "ArticleVII",
      description: "Article7"
    },
    {
      _id: aid8,
      title: "ArticleVIII",
      description: "Article8"
    },
  ];
  await Articles.insertMany(articles);
}

async function deleteArticles() {
  await Articles.deleteMany({});
}

export { aIds, createArticles, deleteArticles };
