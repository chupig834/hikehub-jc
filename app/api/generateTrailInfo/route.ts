import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { connectMongoDB } from "@/lib/mongodb";
import List from "@/models/list";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server"

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: NextRequest) {

    try {
        const { trailName }= await req.json();

        if(!trailName) {
            return NextResponse.json({error: "trailName is required"}, {status: 400})
        }
        
        const prompt = `
        Generate a short bullet list of hiking information for the trail ${trailName}. 
        Include difficult level, estimated time, elevation gain, length in miles,  highlights, and any safety tips 
        Response only with raw JSON without triple backticks or markdown`;

        const completion = await client.chat.completions.create({
            model: 'o4-mini',
            messages: [
                {role: "user", content: prompt}
            ]
        })

        const result = completion.choices[0].message.content;

        return NextResponse.json({data: result}, {status: 200})

    }
    catch {
        return NextResponse.json({error: "Failed to generate trail info"})
    }


}

