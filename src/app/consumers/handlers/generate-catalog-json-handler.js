import catalogService from '../../services/catalog.service';
import s3Service from '../../services/s3.service';

export default async function generateCatalogJsonHandler(messages) {
  for (const message of messages) {
    const messageBody = JSON.parse(message.Body);

    const catalog = await catalogService.generateCatalog(messageBody.ownerId);

    await s3Service.uploadFile(`${messageBody.ownerId}.json`, catalog);
  }
}
