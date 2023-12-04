import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // resetting the cookies
    // @ expires: new Date(0): This sets the expiration date of the cookie to a past date (specifically, January 1, 1970, which is often used to indicate that the cookie has expired). Setting the expiration to a past date effectively deletes the cookie.
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
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
