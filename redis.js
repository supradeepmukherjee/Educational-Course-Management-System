export const redis = () => new Redis(process.env.REDIS)