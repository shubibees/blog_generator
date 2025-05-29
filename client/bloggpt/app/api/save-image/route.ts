import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { base64Image, fileName } = await request.json();
    console.log('fileName',fileName);
    
    // Remove the base64 prefix if it exists
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(),'app', 'assets', 'banner_images');
    await writeFile(
      path.join(uploadsDir, fileName),
      base64Data,
      { encoding: 'base64' }
    );
    
    return NextResponse.json({
      success: true,
      message: 'Image saved successfully',
      filePath: `/app/assets/banner_images/${fileName}`
    });
  } catch (error) {
    console.error('Error saving image:', error);
    return NextResponse.json(
      { error: 'Failed to save image' },
      { status: 500 }
    );
  }
}
