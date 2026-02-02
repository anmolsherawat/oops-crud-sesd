import { Request, Response, NextFunction, Router } from "express";
import { StudentService } from "../services/student.service";
import { StudentQueryOptions } from "../repositories/student.repository";

export class StudentController {
  public router: Router;
  private service: StudentService;

  constructor(service = new StudentService()) {
    this.router = Router();
    this.service = service;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/", this.createStudent);
    this.router.get("/", this.listStudents);
    this.router.get("/:id", this.getStudentById);
    this.router.put("/:id", this.updateStudent);
    this.router.delete("/:id", this.deleteStudent);
  }

  private createStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const student = await this.service.createStudent(req.body);
      res.status(201).json({ success: true, data: student });
    } catch (error) {
      next(error);
    }
  };

  private listStudents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query: StudentQueryOptions = {
        page: req.query.page ? Number(req.query.page) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        sortBy: req.query.sortBy as string | undefined,
        sortOrder: (req.query.sortOrder as "asc" | "desc") || undefined,
        search: req.query.search as string | undefined,
        className: req.query.className as string | undefined,
        isActive:
          typeof req.query.isActive === "string"
            ? req.query.isActive === "true"
            : undefined,
      };

      const result = await this.service.listStudents(query);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  private getStudentById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const student = await this.service.getStudentById(req.params.id);
      if (!student) {
        return res
          .status(404)
          .json({ success: false, message: "Student not found" });
      }
      res.json({ success: true, data: student });
    } catch (error) {
      next(error);
    }
  };

  private updateStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updated = await this.service.updateStudent(req.params.id, req.body);
      if (!updated) {
        return res
          .status(404)
          .json({ success: false, message: "Student not found" });
      }
      res.json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  };

  private deleteStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const deleted = await this.service.deleteStudent(req.params.id);
      if (!deleted) {
        return res
          .status(404)
          .json({ success: false, message: "Student not found" });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}


