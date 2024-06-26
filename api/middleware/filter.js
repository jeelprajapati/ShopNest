
//sort filter
export const sortFilter = (sortBy) => {
  const sortOption = {};

  switch (sortBy) {
    case 1: {
      sortOption.totalStar = -1;
      break;
    }
    // case 2: {
    //   break;
    // }
    case 3: {
      sortOption.createdAt = -1;
      break;
    }
    case 4: {
      sortOption.price = 1;
      break;
    }
    case 5: {
      sortOption.price = -1;
      break;
    }
    default:
      sortOption._id = 1;
      break;
  }
  return sortOption;
};

//price filter

export const priceFilter = (price) => {
  const query = {};

  if (price.min !== undefined && price.max !== undefined) {
    query.price = { $gte: price.min, $lte: price.max };
  } else if ((price.min !== undefined)) {
    query.price = { $gte: price.min };
  } else if (price.max !== undefined) {
    query.price = { $lte: price.min };
  }
  return query
};
