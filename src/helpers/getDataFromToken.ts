import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    // get the token from cookies
    const token = request.cookies.get("token")?.value || "";

    // verify the token using token secret
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET as string);

    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token");
    }

    // return verifiedToken.id;
    return verifiedToken;
  } catch (error) {
    if (error instanceof Error) {
      // Handle the error
      return { error: error.message, status: 500 };
    } else {
      // Handle other cases where 'error' is not an instance of Error
      return { error: "An unknown error occurred", status: 500 };
    }
  }
};
