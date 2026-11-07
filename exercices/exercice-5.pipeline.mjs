const pipeline = [
  {
    $match: {
      status: "RETURNED",
      returnedAt: {
        $gte: new Date("2026-03-01T00:00:00Z"),
        $lt: new Date("2026-05-01T00:00:00Z"),
      },
    },
  },
  {
    $lookup: {
      from: "equipments",
      localField: "equipmentId",
      foreignField: "_id",
      as: "equipments",
    },
  },
  {
    $unwind: "$equipments",
  },
  {
    $match: {
      "equipments.archived": false,
    },
  },
  {
    $group: {
      _id: {
        category: "$equipments.category",
        moi: {
          $dateToString: {
            format: "%Y-%m",
            date: "$returnedAt",
          },
        },
      },
      prets: { $sum: 1 },
      Recettes: { $sum: "$feeCents" },
    },
  },
  {
    $project: {
      _id: 0,
      category: "$_id.category",
      prets: 1,
      Recettes: 1,
      mois :"$_id.moi"
    },
  },
];

export default pipeline;
