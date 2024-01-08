import { NextResponse } from "next/server";
import connectDB from "./config";
import User from "./model";

connectDB();

export async function GET(req: Request, res: Response) {
  const allUser = await User.find({});
  console.log(allUser);
  return NextResponse.json(allUser);
}
