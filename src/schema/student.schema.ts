import { Schema, Document, model } from "mongoose";

export interface StudentDocument extends Document {
  name: string;
  rollNumber: string;
  age?: number;
  className?: string;
  email?: string;
  phone?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<StudentDocument>(
  {
    name: { type: String, required: true, trim: true },
    rollNumber: { type: String, required: true, trim: true, unique: true },
    age: { type: Number, required: false, min: 0 },
    className: { type: String, required: false, trim: true },
    email: { type: String, required: false, trim: true },
    phone: { type: String, required: false, trim: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

export const StudentModel = model<StudentDocument>("Student", StudentSchema);


