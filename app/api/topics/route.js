import { NextResponse } from "next/server";
import Topic from "@/models/topic";
import ConnectMongodb from "@/libs/mongodb";


export async function POST(req) {
  try {
    
    const { title, description } = await req.json();

    await ConnectMongodb(); // Ensure ConnectMongodb handles the MongoDB connection

    await Topic.create({ title, description });

    return NextResponse.json({
      msg: ["Message sent successfully"],
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Something went wrong!",
    }, { status: 500 }); // Provide an appropriate error response
  }
}



// export async function GET() {
//   try {
//     await ConnectMongodb(); // Assuming ConnectMongodb() establishes the database connection
//     const topics = await Topic.find();
//     console.log(topics); // Log the retrieved topics for debugging purposes

//     if (topics.length === 0) {
//       // Handle case when no topics are found
//       return new NextResponse().json({ message: "No topics found" });
//     }

//     return new NextResponse().json({ topics });
//   } catch (error) {
//     console.log("Error occurred:", error);
//     return new NextResponse().json({ error: "Something went wrong!" }, { status: 500 });
//   }
// }

// export async function GET (){
//   try{
//     await ConnectMongodb();
//   const topics = await Topic.find()
//   return NextResponse().json({topics})
//   }catch(error){
//     console.log(error);
//     return NextResponse.json({
//       error: "Something went wrong!",
//     }, { status: 500 })
//   }
// }
export async function GET() {
  try {
    await ConnectMongodb();
    const topics = await Topic.find();
    return new NextResponse(JSON.stringify({ topics }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: 'Something went wrong!' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}


// export async function GET() {
//   try {
//     await ConnectMongodb();
//     const topics = await Topic.find();
//     return new NextResponse().json({ topics });
//   } catch (error) {
//     console.log(error);
//     return new NextResponse().json({ error: "Something went wrong!" }, { status: 500 });
//   }
// }




// export async function POST(request){
//     const {title , description} = await request.json()
//     await ConnectMongodb()
//     await Topic.create({title,description})
//     return NextResponse.json({message:"Topic created"},{status: 201})  
// }

export async function DELETE(request){
  try {
    const id = request.nextUrl.searchParams.get('id')
    await ConnectMongodb()
    await Topic.findByIdAndDelete(id)
    return NextResponse.json({message:"topic deleted"}, {status:200})
  } catch (error) {
    console.log(error);
    return new NextResponse.json({message:"topic deleted"}, {status:200})
  
}

}