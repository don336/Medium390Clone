import Articles from "../model/articles.js";

class ArticleController {
  static async getArticles(req, res) {
    try {
      const articles = await Articles.find();
      return res.status(200).json(articles);
    } catch (error) {
      return res.status(500).json({
        err: error.message,
      });
    }
  }

  static async getArticle(req, res) {
    try {
      const { id } = req.params;
      const foundArticle = await Articles.findById({ _id: id });
      if (!foundArticle) {
        return res.status(400).json({
          msg: "Article Not found",
        });
      }
      return res.status(200).json({
        message: "Article Found",
        foundArticle,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Server Error",
        err: error.message,
      });
    }
  }

  static async createArticle(req, res) {
    const { title, description } = req.body;
    try {
      if (!title || !description) {
        res.status(422).json({ msg: "Fill all required Fields" });
      }
      const newArticle = await Articles.create({
        title,
        description,
      });

      return res.status(201).json({
        message: "Article Created",
        newArticle,
      });
    } catch (error) {
      return res.status(500);
    }
  }

  static async updateArticle(req, res) {
    try {
      const { id } = req.params;

      const article = Articles.findById({ _id: id });

      if (!article) {
        return res.status(400).json({
          msg: "Article Not Found!",
        });
      }

      const { title, description } = req.body;
      const updatedArticle = await Articles.updateOne(
        { _id: id },
        {
          $set: {
            title,
            description,
          },
        },
        { new: true }
      );

      return res.status(201).json({
        message: "Article Updated!",
        updatedArticle,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Server Error",
        err: error.message,
      });
    }
  }

  static async likeArticle(req, res) {
    try {
      const { id } = req.params;

      const likes = await Articles.findByIdAndUpdate(
        id,
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      return res.status(201).json({
        msg: "Like Added",
        likes,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Server Error",
        err: error.message,
      });
    }
  }
  static async commentOnArticle(req, res) {
    try {
      const { id } = req.params;
      const comment = {
        text: req.body.text,
        postedBy: req.user._id,
      };
      const comments = await Articles.findByIdAndUpdate(
        id,
        {
          $push: { comments: comment },
        },
        { new: true }
      );

      return res.status(201).json({
        msg: "Comment Added",
        comments,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async unComment(req, res) {
    try {
      const { id } = req.params;
      const comment = {
        postedBy: req.user._id,
      };
      const comments = await Articles.findByIdAndUpdate(
        id,
        {
          $pull: { comments: comment },
        },
        { new: true }
      );

      return res.status(201).json({
        msg: "Comment Removed",
        comments,
      });
    } catch (error) {
      return res.status(400).json({
        err: error,
      });
    }
  }

  static async deleteArticle(req, res) {
    try {
      const { id } = req.params;

      const article = await Articles.findById({ _id: id });

      if (!article) {
        return res.status(400).json({
          msg: "Article Not Found!",
        });
      }

      const deletedArticle = await Articles.findByIdAndDelete({ _id: id });

      return res.status(204).json({
        Message: "Article Has Been Deleted!",
        article,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Server Error",
        err: error.message,
      });
    }
  }
}

export default ArticleController;
