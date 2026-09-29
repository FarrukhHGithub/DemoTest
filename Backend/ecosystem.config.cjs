module.exports = {
  apps: [
    {
      name: 'drfayaz-backend',
      script: './index.js',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 8800,
        MONGO_URI: "mongodb+srv://FarrukhBalay:FarrukhBalay@cluster0.kqaf8ub.mongodb.net/",
        MONGODB_URI: "mongodb+srv://FarrukhBalay:FarrukhBalay@cluster0.kqaf8ub.mongodb.net/",
        SENDGRID_API_KEY: ""
      }
    }
  ]
};
