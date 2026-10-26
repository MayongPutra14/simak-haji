// Change the words to titleCase
export function titleCase(text) {
  if (!text || text === undefined || text === null) return null;

  const cleanText = text.toLowerCase().replace(/_/g, ' ');

  if (cleanText === 'pernah umrah') {
    return 'Pernah umrah';
  }

  return cleanText
    .toLowerCase()
    .replace(/_/g, ' ')
    .split(' ')
    .map((kata) => {
      const kataKapital = kata.charAt(0).toUpperCase() + kata.slice(1);
      return kataKapital.replace(/\.[a-z]/g, (match) => match.toUpperCase());
    })
    .join(' ');
}

// Handler Copy Hash QR
export function handleCopyHash(qrHash, setCopied) {
  if (qrHash) {
    navigator.clipboard.writeText(qrHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
}

// Handler Download Canvas QR Code ke PNG
export function handleDownloadQR(qrRef, eventName) {
  const canvas = qrRef.current?.querySelector('canvas');
  if (canvas) {
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `QR-${eventName.replace(/\s+/g, '_')}.png`;
    link.click();
  }
}

// Handle Download Material Event
export async function handleDownloadMaterial(material, eventName, BASE_URL) {
  if (!material) return;

  const fileUrl = `${BASE_URL}/${material}`;

  // Get the original file extension (e.g., pdf, docx)
  const fileExtension = material.split('.').pop();

  // Create a clean file name for the download
  const fileName = `Material_${eventName.replace(/\s+/g, '_')}.${fileExtension}`;

  try {
    // 1. Fetch the file as Blob data
    const response = await fetch(fileUrl);
    const blob = await response.blob();

    // 2. Create a temporary URL object from the Blob
    const blobUrl = window.URL.createObjectURL(blob);

    // 3. Create an invisible <a> element to trigger the download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName; // Force the browser to download with this name
    document.body.appendChild(link);
    link.click();

    // 4. Clean up from browser memory
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Failed to download file:', error);
    // Fallback: If fetch fails (e.g., CORS issues), open the file in a new tab
    window.open(fileUrl, '_blank');
  }
}

export function openWa(number) {
  const cleanNumber = number.replace(/^0+/, '');
  const text =
    "Assalamu'alaikum, Admin SIMAK. Saya ingin berkonsultasi mengenai program SIMAK ini.";

  const message = encodeURIComponent(text);
  window.open(
    `https://wa.me/62${cleanNumber}?text=${message}`,
    '_blank',
    'noopener,noreferrer',
  );
}

// Route Not found
export function getHomeRoute(userRole) {
  if (!userRole) return '/';

  switch (userRole) {
  case 'admin':
    return '/admin/home';
  case 'user':
    return '/user/home';
  default:
    return '/';
  }
}

// JSON parser for Landing page
export function JSONParser(value) {
  if (!value || value === null) return null;
  const contentFormatted = JSON.parse(value);

  return contentFormatted;
}

// Splits a headline string into parts based on double quotes for highlighting
export function parseHeadlineWithQuotes(headline) {
  // Return default structure if headline is invalid or missing
  if (!headline || typeof headline !== 'string') {
    return { part1: '', highlighted: '', part3: '' };
  }

  // Regex to match text inside double quotes
  const match = headline.match(/"([^"]+)"/);

  if (!match) {
    return { part1: headline, highlighted: '', part3: '' };
  }

  // Split the string using the quoted part as a separator
  const parts = headline.split(match[0]);

  return {
    firstText: parts[0]?.trim() || '',
    highlighted: match[1],
    secondText: parts[1]?.trim() || '',
  };
}

// COMPRESS IMAGE AND CHANGE TO WEBP: landing_page
export const compressAndConvertToWebP = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // (Optional) Limit maximum dimensions if too large to keep file size small
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to webp format with 0.8 quality (80% - optimal for web)
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to convert image to WebP'));
              return;
            }
            // Create a new file with .webp extension using template literals
            const baseName = file.name.replace(/\.[^/.]+$/, '');
            const newFileName = `${baseName}.webp`;

            const webpFile = new File([blob], newFileName, {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            resolve(webpFile);
          },
          'image/webp',
          0.8, // Compression quality (0.1 to 1.0)
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

// HELPER: RECURSIVELY PROCESS AND UPLOAD ALL FILE OBJECTS IN PAYLOAD
export const processAndUploadFiles = async (data, uploadFn) => {
  if (!data) return data;

  // handle direct file object
  if (data instanceof File) {
    const uploadResult = await uploadFn(data);
    return uploadResult;
  }

  // handle array structure recursively
  if (Array.isArray(data)) {
    return await Promise.all(
      data.map((item) => processAndUploadFiles(item, uploadFn)),
    );
  }

  // handle nested object structure recursively
  if (typeof data === 'object' && data !== null) {
    // case: handle image node containing file property
    if (data.file instanceof File) {
      const uploadResult = await uploadFn(data.file);
      const updatedObject = { ...data };
      delete updatedObject.file; // remove local file instance

      if (uploadResult) {
        // map uploaded result properties safely to cover url/image_url differences
        updatedObject.url = uploadResult.image_url;
        updatedObject.image_url = uploadResult.image_url;
        updatedObject.public_id = uploadResult.public_id;
      }
      return updatedObject;
    }

    // traverse all other keys recursively
    const updatedObject = {};
    for (const key of Object.keys(data)) {
      updatedObject[key] = await processAndUploadFiles(data[key], uploadFn);
    }
    return updatedObject;
  }

  return data;
};
