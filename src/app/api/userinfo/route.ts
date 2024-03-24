import { GetAllUsersInfo, PostUserInfo, generateUniqueId } from "lib/data";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  try {
    const newId: number = generateUniqueId();
    const {
      name,
      email,
      password,
    }: { name: string; email: string; password: string } = await req.json();
    const userData = {
      name,
      email,
      password,
      id: newId,
    };
    PostUserInfo(userData);
      return NextResponse.json({message : "OK", userData},{status : 201})
  } catch (error) {
      return NextResponse.json({
          message :"Error", error
      },
          {
          status : 500
      })
  }
};

export const GET = async (req:Request, res:Response) => {
  try {
    const userData = GetAllUsersInfo();
    return NextResponse.json(
      {
        message: "ok",
        userDetails: userData,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 500,
      },
    );
  }
};