// Change the words to titleCase
export const titleCase = (text) => {
  if (!text) return '';

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
};

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
  if (!material?.file_path) return;

  const fileUrl = `${BASE_URL}/${material.file_path}`;

  // Get the original file extension (e.g., pdf, docx)
  const fileExtension = material.file_path.split('.').pop();

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
