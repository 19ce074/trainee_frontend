// const { BlobServiceClient } = require('@azure/storage-blob');

// async function uploadFiles() {
//   const connectionString = 'DefaultEndpointsProtocol=https;AccountName=vmstorageclass;AccountKey=bPhGeAfFknAKwcgu9rUHHNxDUs7siksdaGISfGDFymAANGCeOGryvc+Hw0b2Zm7GrMixvldiUVVl+AStPOk3Vw==;EndpointSuffix=core.windows.net';
//   const containerName = '$web';

//   const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
//   const containerClient = blobServiceClient.getContainerClient(containerName);

//   const files = ['build/index.html'];

//   for (const filePath of files) {
//     const blobName = filePath.replace('build/', '');
//     const blockBlobClient = containerClient.getBlockBlobClient(blobName);

//     await blockBlobClient.uploadFile(filePath);
//     console.log(`Uploaded ${blobName}`);
//   }

//   console.log('Upload completed.');
// }

// uploadFiles().catch(console.error);



const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');
const path = require('path');

async function uploadFiles() {
  const connectionString = 'DefaultEndpointsProtocol=https;AccountName=vmblobstore;AccountKey=qHWvaXgeC6zYZK6mhkLN57zcytf7VtF9b6HTtKFdq1Zm60p578cJ9mdwOsjuZQlPd0zUFjG8fi4L+AStd9jykg==;EndpointSuffix=core.windows.net';
  const containerName = '$web';

  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const files = getFilesRecursive('build');

  for (const filePath of files) {
    const blobName = filePath.replace('build/', '');
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadFile(filePath);
    console.log(`Uploaded ${blobName}`);
  }

  console.log('Upload completed.');
}

function getFilesRecursive(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const filePath = path.join(dir, entry.name);
    const relativePath = path.relative('.', filePath);

    if (entry.isFile()) {
      files.push(relativePath);
    } else if (entry.isDirectory()) {
      files = [...files, ...getFilesRecursive(filePath)];
    }
  }

  return files;
}

uploadFiles().catch(console.error);
