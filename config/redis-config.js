const redis = require("redis");
module.exports = {
  client: redis.createClient({
    host: "my-redis",
    port: 6379,
  }),
};
