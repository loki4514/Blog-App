import { connect } from "@/dbconfig/dbconfig";
import Blog from '@/models/blog_post'
import { read } from "fs";
import { NextRequest, NextResponse } from "next/server";


connect()


export async function POST(request : NextRequest) {
    const reqBody = await request.json()
    const { title, blog, reading_time, featured_image, tags }: { title: string, blog: string, reading_time: string, featured_image: string, tags: string[] } = reqBody;
    

    if (title === '' || blog === "" || reading_time === "" || featured_image === "" || tags.length === 0) {
        return NextResponse.json({message : "Please enter all the fields", success : false})
    }
    if (title.length < 5 ) {
        return NextResponse.json({message : "Title should be atleast 5 character ", success : false})
    }
    if (title.length > 30 ) {
        return NextResponse.json({message : "Title should be not more than 30 character ", success : false})
    }
    if (blog.trim().length < 20){
        return NextResponse.json({message : "Blog content should be atleast 30 character ", success : false})
    }
    if (tags.length >= 5){
        return NextResponse.json({message : "Tags shouldn't be not more than 5 ", success : false})
    }
    const ParsedTime = parseInt(reading_time)
    const blog_content = new Blog({
        title : title,
        content : blog,
        featured_image : featured_image,
        created_at : Date.now,
        reading_time : ParsedTime,
        tags : tags
    })

    await blog_content.save()

    return NextResponse.json({message : "Blog Created Successfully", success : true})


    const parseed_reading_time = parseInt(reading_time)



}