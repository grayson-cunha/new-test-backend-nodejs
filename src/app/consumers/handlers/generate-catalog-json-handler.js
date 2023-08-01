import catalogService from '../../services/catalog.service';

export default async function generateCatalogJsonHandler(messages) {
  for (const message of messages) {
    const messageBody = JSON.parse(message.Body);

    const catalog = await catalogService.generateCatalog(messageBody.ownerId);
  }
}
