import { Express } from "express";

import authRoutes from "./auth.route";
import fileRoutes from "./file.route";
import postRoutes from "./post.route";
import userRoutes from "./user.route";
import userLikeRoutes from "./userLikeEntity.route";
import commentRoutes from "./comment.route";
import userRelationshipRoutes from "./userRelationship.route";
import userInvitationRoutes from "./userInvitation.route";

const initRoutes = (app: Express) => {
    app.use("/api/auth", authRoutes);
    app.use("/api/files", fileRoutes);
    app.use("/api/posts", postRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/comments", commentRoutes);
    app.use("/api/user-like-entities", userLikeRoutes);
    app.use("/api/user-relationships", userRelationshipRoutes);
    app.use("/api/user-invitations", userInvitationRoutes);
};

export default initRoutes;
