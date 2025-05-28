import { v2 as cloudinary, UploadApiOptions } from "cloudinary";
import fs from "fs";
import httpStatus from "http-status";

import config from "../config";
import { FileTypes } from "../interfaces/file";
import fileRepository from "../repositories/file.repository";
import ApiError from "../utils/ApiError";

cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
});

class ImageService {
    upload = async (filePath: string, options?: UploadApiOptions) => {
        try {
            const res = await cloudinary.uploader.upload(filePath, options);

            return res;
        } finally {
            fs.unlink(filePath, () => {});
        }
    };

    uploadWithEntity = async (filePath: string, object: any, size?: number) => {
        let publicId: string | null = null;
        let type: string | null = null;
        let resourceType: string | null = null;
        try {
            const res = await this.upload(filePath, {
                transformation: {
                    width: size ?? 600,
                },
                resource_type: "auto",
                use_filename: true,
                folder: `${object.constructor.name}/${object.id}`,
            });

            publicId = res.public_id;
            resourceType = res.resource_type;
            type = res.type;

            const file = fileRepository.create({
                entityType: object.constructor.name,
                entityId: object.id,
                path: `${res.resource_type}/${res.type}/v${res.version}/${res.public_id}.${res.format}`,
                type: res.resource_type as FileTypes,
                publicId: res.public_id,
            });

            file.metadata = {
                width: res.width,
                height: res.height,
                filename: res.original_filename,
                mimetype: `${res.resource_type}.${res.format}`,
                size: res.bytes,
                version: res.version,
            };

            await fileRepository.save(file);

            return res;
        } catch (err) {
            if (publicId && type && resourceType) {
                this.deleteResource(publicId, resourceType, type);
            }
            fs.unlink(filePath, () => {});
            throw new ApiError(httpStatus.BAD_REQUEST, "Upload failed", err);
        }
    };

    destroy = async (id: string) => {
        try {
            const file = await fileRepository.findOne({
                where: { id },
            });
            if (!file) {
                return false;
            }

            if (!file.path.startsWith("http")) {
                const resourceType = file.type;
                const type = file.path.split("/")[1];
                this.deleteResource(file.publicId, resourceType, type);
            }

            await fileRepository.delete(id);

            return true;
        } catch (err) {
            return false;
        }
    };

    async deleteResource(publicId: string, resourceType: string, type: string) {
        return await cloudinary.api.delete_resources([publicId], {
            resource_type: resourceType,
            type,
        });
    }

    findByEntityId = async (id: number) => {
        const files = await fileRepository.find({
            where: {
                entityId: id,
            },
        });

        return files;
    };
}

export default new ImageService();
