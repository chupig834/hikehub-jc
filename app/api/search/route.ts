import { connectMongoDB } from "@/lib/mongodb";
import List from "@/models/list";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query");
    const dateFilter = url.searchParams.get("dateFilter");
    const hikeLengthFilter = url.searchParams.get("hikeLength");
    const elevationGainFilter = url.searchParams.get("elevationGain");
    const limit = url.searchParams.get("limit");

    await connectMongoDB();

    const pipeline: any[] = [
      // First match public visibility
      {
        $match: {
          visibility: "public"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "email",
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" },
      { $sort: { "createdAt": -1 } },
      { $limit: parseInt(limit) || 100 },
    ];

    // Add hike length filtering
    if (hikeLengthFilter) {
      // Add a stage to extract the numeric value from hikeLength
      pipeline.push({
        $addFields: {
          numericLength: {
            $convert: {
              input: {
                $replaceAll: {
                  input: { $arrayElemAt: [{ $split: ["$hikeLength", " "] }, 0] },
                  find: " ",
                  replacement: ""
                }
              },
              to: "double",
              onError: 0
            }
          }
        }
      });

      // Add the filter based on the numeric value
      let lengthMatch;
      switch (hikeLengthFilter) {
        case 'short':
          lengthMatch = { numericLength: { $lte: 5 } };
          break;
        case 'medium':
          lengthMatch = { 
            numericLength: { 
              $gt: 5,
              $lte: 10
            } 
          };
          break;
        case 'long':
          lengthMatch = { numericLength: { $gt: 10 } };
          break;
      }

      if (lengthMatch) {
        pipeline.push({
          $match: lengthMatch
        });
      }
    }

    // Add elevation gain filtering
    if (elevationGainFilter) {
      // Add a stage to extract the numeric value from elevationGain
      pipeline.push({
        $addFields: {
          numericElevation: {
            $convert: {
              input: {
                $replaceAll: {
                  input: {
                    $replaceAll: {
                      input: { $arrayElemAt: [{ $split: ["$elevationGain", " "] }, 0] },
                      find: ",",
                      replacement: ""
                    }
                  },
                  find: " ",
                  replacement: ""
                }
              },
              to: "double",
              onError: 0
            }
          }
        }
      });

      // Add the filter based on the numeric value
      let elevationMatch;
      switch (elevationGainFilter) {
        case 'low':
          elevationMatch = { numericElevation: { $lt: 500 } };
          break;
        case 'moderate':
          elevationMatch = { 
            numericElevation: { 
              $gte: 500,
              $lt: 1000
            } 
          };
          break;
        case 'high':
          elevationMatch = { 
            numericElevation: { 
              $gte: 1000,
              $lt: 2000
            } 
          };
          break;
        case 'extreme':
          elevationMatch = { numericElevation: { $gte: 2000 } };
          break;
      }

      if (elevationMatch) {
        pipeline.push({
          $match: elevationMatch
        });
      }
    }

    // Add date filtering
    if (dateFilter) {
      const now = new Date();
      let startDate = new Date();

      switch (dateFilter) {
        case "today":
          startDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          startDate.setDate(now.getDate() - 7);
          break;
        case "month":
          startDate.setMonth(now.getMonth() - 1);
          break;
        case "year":
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      pipeline.push({
        $match: {
          createdAt: { $gte: startDate }
        }
      });
    }

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
          userName: "$userInfo.name",
          createdAt: 1,
          hikeLength: 1,
          elevationGain: 1
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