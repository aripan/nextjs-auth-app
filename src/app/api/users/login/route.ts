import { connectToDB } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// connect to database
connectToDB();

// request
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        {
          error: "Invalid password",
        },
        { status: 400 }
      );
    }

    // create token payload
    const tokenData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    // create token
    const token = await jwt.sign(
      tokenData,
      process.env.TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );

    // response
    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });

    //@ to set cookies => need to have the response object first
    //@ { httpOnly: true }: This is an option for the cookie. httpOnly is a security option that ensures that the cookie is only accessible by the server and not by client-side scripts. This helps to mitigate certain types of cross-site scripting (XSS) attacks.
    // store the token in cookies
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
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
