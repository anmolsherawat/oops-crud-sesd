import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { bookRouter } from "./routes/book.routes";

dotenv.config();

interface AppInterface {
  startServer(): void;
  connectDatabase(): Promise<void>;
  initializeMiddlewares(): void;
  initializeRoutes(): void;
}

export class App implements AppInterface {
  private readonly port: number;
  public app: Application;

  constructor() {
    this.port = Number(process.env.PORT) || 4000;
    this.app = express();

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public async startServer(): Promise<void> {
    await this.connectDatabase();
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public async connectDatabase(): Promise<void> {
    const uri =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/sesd_workshop";

    try {
      await mongoose.connect(uri);
      console.log("Database connected");
    } catch (err) {
      console.error("Failed to connect to database", err);
      process.exit(1);
    }
  }

  public initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  public initializeRoutes(): void {
    this.app.get("/", (_req: Request, res: Response) => {
      res.json({ message: "OOP CRUD API is running" });
    });

    this.app.use("/api/books", bookRouter);
  }

  private initializeErrorHandling(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.use(
      (err: Error, _req: Request, res: Response, _next: NextFunction) => {
        console.error(err);
        res
          .status(400)
          .json({ success: false, message: err.message || "Something went wrong" });
      }
    );
  }
}