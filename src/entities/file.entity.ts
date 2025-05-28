import {
    AfterLoad,
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { FileEntityTypes, FileTypes, ImageMetadata } from "../interfaces/file";
import getFileUrl from "../utils/getFileUrl";

@Entity("Files")
class File {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    entityType: FileEntityTypes;

    @Column()
    entityId: number;

    @Column()
    publicId: string;

    @Column()
    path: string;

    @Column()
    type: FileTypes;

    @Column({ name: "metadata" })
    _metadata: string;

    metadata: ImageMetadata | null = null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    url: string;

    @BeforeUpdate()
    @BeforeInsert()
    beforInserOrUpdate() {
        if (this.metadata) {
            this._metadata = JSON.stringify(this.metadata);
        }
    }

    @AfterLoad()
    getMetadata() {
        this.url = getFileUrl(this.path);

        if (this._metadata) {
            this.metadata = JSON.parse(this._metadata);
        }
    }
}

export default File;
