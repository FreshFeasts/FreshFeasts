export const calcAverageRating = (ratings) => {
    let totalRatings = 0;
    let totalCount = 0;

    for (const rating in ratings) {
      const count = ratings[rating];
      totalRatings += parseInt(rating, 10) * count;
      totalCount += count;
    }

    const averageRating = totalRatings / totalCount;

    return averageRating.toFixed(1);
};
