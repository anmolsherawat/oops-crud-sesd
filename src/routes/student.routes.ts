import { Router } from "express";
import { StudentController } from "../controller/student.controller";
import { authMiddleware } from "../utils/auth.middleware";

const studentController = new StudentController();

const studentRouter = Router();

studentRouter.use(authMiddleware);
studentRouter.use("/", studentController.router);

export { studentRouter };


