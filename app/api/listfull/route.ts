import { connectMongoDB } from "@/lib/mongodb";
import List from "@/models/list";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query");

    await connectMongoDB();

    const pipeline: any[] = [
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "email",
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" },
    ];

    // Only apply $match if there's a query
    if (query) {
      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { "userInfo.name": { $regex: query, $options: "i" } }
          ]
        }
      });
    }

    pipeline.push(
      {
        $project: {
          _id: 1,
          name: 1,
          coverImage: 1,
          userName: "$userInfo.name"
        }
      },
    );

    const results = await List.aggregate(pipeline);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
