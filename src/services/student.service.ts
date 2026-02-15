import { StudentDocument } from "../schema/student.schema";
import {
  StudentQueryOptions,
  StudentRepository,
} from "../repositories/student.repository";

export interface CreateStudentDTO {
  name: string;
  rollNumber: string;
  age?: number;
  className?: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
}

export interface UpdateStudentDTO {
  name?: string;
  rollNumber?: string;
  age?: number;
  className?: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
}

export class StudentService {
  private repository: StudentRepository;

  constructor(repository = new StudentRepository()) {
    this.repository = repository;
  }

  async createStudent(data: CreateStudentDTO): Promise<StudentDocument> {
    this.validateCreateData(data);
    return await this.repository.create(data);
  }

  async getStudentById(id: string): Promise<StudentDocument | null> {
    return await this.repository.findById(id);
  }

  async listStudents(query: StudentQueryOptions) {
    return await this.repository.findAll(query);
  }

  async updateStudent(id: string, data: UpdateStudentDTO) {
    this.validateUpdateData(data);
    return await this.repository.update(id, data);
  }

  async deleteStudent(id: string) {
    return await this.repository.delete(id);
  }

  private validateCreateData(data: CreateStudentDTO) {
    if (!data.name || !data.rollNumber) {
      throw new Error("name and rollNumber are required");
    }

    if (data.age !== undefined && typeof data.age !== "number") {
      throw new Error("Age must be a number");
    }
  }

  private validateUpdateData(data: UpdateStudentDTO) {
    if (data.age !== undefined && typeof data.age !== "number") {
      throw new Error("Age must be a number");
    }
  }
}


