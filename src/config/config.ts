// eslint-disable-next-line import/no-anonymous-default-export
export default () => ({
  database: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "7d",
  },
});
