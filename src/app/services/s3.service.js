const { Upload } = require('@aws-sdk/lib-storage');
const { S3Client } = require('@aws-sdk/client-s3');

class S3Service {
  async uploadFile(fileName, data) {
    return new Upload({
      client: new S3Client(),
      params: {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${new Date().toJSON()}-${fileName}`,
        Body: JSON.stringify(data),
      },
      tags: [], // optional tags
    }).done();
  }
}

export default new S3Service();
