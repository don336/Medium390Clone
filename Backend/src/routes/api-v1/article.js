import {Router} from "express";
import ArticleController from "../../controllers/article.js";
import { checkAuth } from "../../middleware/checkAuth.js";

const articleRoute = Router();

articleRoute.get("/", ArticleController.getArticles);

articleRoute.get("/:id", checkAuth, ArticleController.getArticle);

articleRoute.post("/", checkAuth, ArticleController.createArticle);

articleRoute.put("/:id", checkAuth, ArticleController.updateArticle);
articleRoute.delete("/:id", checkAuth, ArticleController.deleteArticle);

articleRoute.put("/:id/likes", checkAuth, ArticleController.likeArticle);
articleRoute.put(
  "/:id/comments",
  checkAuth,
  ArticleController.commentOnArticle
);
articleRoute.put("/:id/uncomment", checkAuth, ArticleController.unComment);

export default articleRoute;
