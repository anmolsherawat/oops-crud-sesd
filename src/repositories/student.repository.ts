import { FilterQuery } from "mongoose";
import { StudentDocument, StudentModel } from "../schema/student.schema";

export interface StudentQueryOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string; // name or rollNumber
  className?: string;
  isActive?: boolean;
}

export class StudentRepository {
  async create(data: Partial<StudentDocument>): Promise<StudentDocument> {
    const student = new StudentModel(data);
    return await student.save();
  }

  async findById(id: string): Promise<StudentDocument | null> {
    return await StudentModel.findById(id);
  }

  async findAll(query: StudentQueryOptions) {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      search,
      className,
      isActive,
    } = query;

    const filter: FilterQuery<StudentDocument> = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { rollNumber: { $regex: search, $options: "i" } },
      ];
    }

    if (className) {
      filter.className = className;
    }

    if (typeof isActive === "boolean") {
      filter.isActive = isActive;
    }

    const sort: Record<string, 1 | -1> = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      StudentModel.find(filter).sort(sort).skip(skip).limit(limit),
      StudentModel.countDocuments(filter),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(
    id: string,
    data: Partial<StudentDocument>
  ): Promise<StudentDocument | null> {
    return await StudentModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string): Promise<StudentDocument | null> {
    return await StudentModel.findByIdAndDelete(id);
  }
}


