const News = require("../models/newsModel");

const newsController = {
  getAllNews: (req, res) => {
    News.getAllNews((err, results) => {
      if (err) {
        console.error("Error fetching news:", err);
        return res.status(500).json({ error: "Failed to fetch news" });
      }

      // Chuyển đổi ảnh từ Buffer sang Base64
      const newsWithImages = results.map((news) => {
        if (news.image) {
          // Chuyển đổi dữ liệu nhị phân (Buffer) thành chuỗi Base64
          news.image = `data:image/png;base64,${news.image.toString("base64")}`;
        } else {
          news.image = null; // Nếu không có ảnh, trả về null
        }
        return news;
      });

      res.status(200).json(newsWithImages);
    });
  },

  getNewsById: (req, res) => {
    const { id } = req.params;

    News.getNewsById(id, (err, results) => {
      if (err) {
        console.error("Error fetching news:", err);
        return res.status(500).json({ error: "Failed to fetch news" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "News not found" });
      }

      const newsWithImages = results.map((news) => {
        if (news.image) {
          // Chuyển đổi dữ liệu nhị phân (Buffer) thành chuỗi Base64
          news.image = `data:image/png;base64,${news.image.toString("base64")}`;
        } else {
          news.image = null; // Nếu không có ảnh, trả về null
        }
        return news;
      });

      res.status(200).json(newsWithImages[0]);
    });
  },

  createNews: (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.buffer : null;

    if (!title || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newsData = { title, content, image };

    News.createNews(newsData, (err, result) => {
      if (err) {
        console.error("Error creating news:", err);
        return res.status(500).json({ error: "Failed to create news" });
      }

      res.status(201).json({
        message: "News created successfully",
        newsId: result.insertId,
      });
    });
  },

  updateNewsById: (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const image = req.file ? req.file.buffer : null;

    if (!title || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newsData = { title, content, image };

    News.updateNewsById(id, newsData, (err, result) => {
      if (err) {
        console.error("Error updating news:", err);
        return res.status(500).json({ error: "Failed to update news" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "News not found" });
      }

      res.status(200).json({ message: "News updated successfully" });
    });
  },

  deleteNewsById: (req, res) => {
    const { id } = req.params;

    News.deleteNewsById(id, (err, result) => {
      if (err) {
        console.error("Error deleting news:", err);
        return res.status(500).json({ error: "Failed to delete news" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "News not found" });
      }

      res.status(200).json({ message: "News deleted successfully" });
    });
  },
};

module.exports = newsController;
