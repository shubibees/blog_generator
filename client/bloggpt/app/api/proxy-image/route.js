export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');
  
  if (!imageUrl) {
    return new Response(JSON.stringify({ error: 'No image URL provided' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // For Azure Blob Storage URLs with SAS tokens, we need to inform the client
  // that direct access is required as these URLs often have IP or origin restrictions
  // if (imageUrl.includes('blob.core.windows.net') && imageUrl.includes('sig=')) {
  //   return new Response(JSON.stringify({ 
  //     error: 'This Azure Blob Storage URL requires direct access',
  //     originalUrl: imageUrl,
  //     needsDirectAccess: true
  //   }), {
  //     status: 403,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // }

  try {
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      return new Response(JSON.stringify({ 
        error: `Failed to fetch image: ${response.statusText}`,
        originalUrl: imageUrl,
        status: response.status
      }), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const imageBlob = await response.blob();
    
    return new Response(imageBlob, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/png',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Error proxying image:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to proxy image', 
      message: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
