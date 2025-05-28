const jwt = {
    ttl: Number(process.env.JWT_TTL),
    refreshTtl: Number(process.env.JWT_REFRESH_TTL),
    secret: String(process.env.JWT_SECRET),
};

export default jwt;
