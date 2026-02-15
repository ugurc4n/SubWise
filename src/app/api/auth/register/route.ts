import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Register request received:", { email: body.email, name: body.name });
    
    const { name, email, password } = body;

    if (!email || !password) {
      console.log("Missing email or password");
      return NextResponse.json(
        { error: "Email ve şifre gereklidir" },
        { status: 400 }
      );
    }

    // Kullanıcı zaten var mı kontrol et
    console.log("Checking if user exists:", email);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists:", email);
      return NextResponse.json(
        { error: "Bu email adresi zaten kullanılıyor" },
        { status: 400 }
      );
    }

    // Şifreyi hashle
    console.log("Hashing password...");
    const hashedPassword = await hash(password, 12);

    // Kullanıcıyı oluştur
    console.log("Creating user...");
    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
        password: hashedPassword,
      },
    });

    console.log("User created successfully:", user.id);
    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error details:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "Kayıt sırasında bir hata oluştu" },
      { status: 500 }
    );
  }
}
