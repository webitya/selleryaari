import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Convert to base64 for more reliable upload in some serverless environments
    const fileBase64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: 'selleryaari',
      resource_type: 'auto',
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('CLOUDINARY_UPLOAD_ERROR:', error);
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error.message,
      code: error.http_code 
    }, { status: 500 });
  }
}

