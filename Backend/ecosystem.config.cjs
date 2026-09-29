module.exports = {
  apps: [
    {
      name: 'drfayaz-backend',
      script: './index.js',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 8800,
        MONGO_URI: process.env.MONGO_URI,
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
      }
    }
  ]
};
