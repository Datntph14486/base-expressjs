import config from "../config";

const getFileUrl = (path: string) => {
    return `${config.cloudinary.domain}/${config.cloudinary.cloudName}/${path}`;
};

export default getFileUrl;
