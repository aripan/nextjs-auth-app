import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/dbconfig/dbconfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

// connect to database
connectToDB();

export async function GET(request: NextRequest) {
  try {
    const userDataFromToken = await getDataFromToken(request);
    const user = await User.findOne({ _id: userDataFromToken.id }).select(
      "-password -isAdmin"
    );

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      // Handle the error
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      // Handle other cases where 'error' is not an instance of Error
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
