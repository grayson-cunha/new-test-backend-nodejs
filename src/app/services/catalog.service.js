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
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'category',
          as: 'itens',
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
        },
      },
      {
        $project: {
          _id: 0,
          category_title: '$title',
          category_description: '$description',
          itens: 1,
          ownerId: 1,
        },
      },
    ]);
  }
}

export default new CatalogService();
