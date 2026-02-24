// module.exports = {
//   url: "mongodb://admin:admin123@localhost:27017/dd_db?authSource=admin"
// };

module.exports = {
  url: process.env.MONGO_URI || "mongodb://localhost:27017/crud_db"
};
