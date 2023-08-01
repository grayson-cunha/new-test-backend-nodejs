import Category from '../models/category.model';

class CatalogService {
  generateCatalog(ownerId) {
    return Category.aggregate([
      {
        $match: {
          ownerId,
        },
      },
      {
        $project: {
          _id: 0,
          category_title: '$title',
          category_description: '$description',
          ownerId: 1,
        },
      },
      {
        $lookup: {
          from: 'products',
          pipeline: [
            {
              $project: {
                _id: 0,
                title: 1,
                description: 1,
                price: 1,
              },
            },
          ],
          as: 'itens',
        },
      },
    ]);
  }
}

export default new CatalogService();
