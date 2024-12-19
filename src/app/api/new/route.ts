import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.NEWS_API_KEY; // Make sure this is set in your environment variables
  const url = `https://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data); // Return the JSON response
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
