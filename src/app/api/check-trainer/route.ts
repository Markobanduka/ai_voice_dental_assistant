// import { currentUser } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const user = await currentUser();
//   if (!user) return NextResponse.json({ isTrainer: false });

//   const email = user.emailAddresses[0]?.emailAddress;
//   if (!email) return NextResponse.json({ isTrainer: false });

//   const trainer = await prisma.trainer.findUnique({
//     where: { email },
//   });

//   return NextResponse.json({ isTrainer: !!trainer });
// }
