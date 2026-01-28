import { readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Read the SVG favicon file
    const faviconPath = join(process.cwd(), 'app', 'favicon.svg');
    const faviconContent = readFileSync(faviconPath, 'utf-8');

    // Return the SVG content with proper headers for favicon.ico requests
    return new NextResponse(faviconContent, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    // If SVG file doesn't exist, return a simple fallback
    const fallbackSvg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#1C274C"/></svg>`;

    return new NextResponse(fallbackSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  }
}