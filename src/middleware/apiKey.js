import config from "../config/config.js";

export const validateApiKey = (req, res, next) => {
  const apiKey =
    req.headers["x-api-key"] ||
    req.headers["authorisation"]?.replace("Bearer ", "");

  if (!apiKey) {
    return res.status(401).json({
      error: "Unauthorised",
      message:
        "API key is required. Provide it in X-API0KEY header or Authorisation header",
    });
  }

  if (apiKey !== config.apiKey) {
    return res.status(403).json({
      error: "Forbidden",
      message: "Imvalid API key",
    });
  }

  next();
};

export const validateApiKeyProduction = (req, res, next) => {
  if (config.isProduction()) {
    return validateApiKey(req, res, next);
  }
  next();
};

export default validateApiKey;
