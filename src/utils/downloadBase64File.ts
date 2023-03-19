export function downloadFileFromBase64(base64String: string, fileName: string) {
  const byteCharacters = atob(base64String);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const chunk = byteCharacters.slice(offset, offset + 1024);
    const byteNumbers = new Array(chunk.length);
    for (let i = 0; i < chunk.length; i++) {
      byteNumbers[i] = chunk.charCodeAt(i);
    }
    byteArrays.push(new Uint8Array(byteNumbers));
  }
  console.log(fileName);

  let _fileType = "text/plain";
  let _fileExtension = 'txt';
  if (fileName.indexOf('.') > 0) {
    _fileExtension = fileName.split('.')[1];
  } else {
    fileName += ".txt";
    _fileExtension = 'txt';
  }
  switch (_fileExtension.toUpperCase()) {
    case "TXT":
      _fileType = "text/plain";
      break;
    case "PDF":
      _fileType = "application/pdf";
      break;
    case "JPEG":
      _fileType = "image/jpeg";
      break;
    case "PNG":
      _fileType = "image/png";
      break;
    case "GIF":
      _fileType = "image/gif";
      break;
  }
  const blob = new Blob(byteArrays, { type: _fileType });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}
