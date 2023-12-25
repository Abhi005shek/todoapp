import { Router } from "express";
import {createTask,getMyTask,updateTask,deleteTask} from "../controller/taskController.js"
import { isAuthenticated } from "../middlewares/auth.js";

const router = Router();

router.post("/new",isAuthenticated,createTask);

router.get("/mytasks",isAuthenticated,getMyTask);

router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);

export default router;