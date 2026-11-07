const pipeline = [
  {
    $match: {
      status: "DONE",
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
      _id: "$equipments.category",
      InterventionsTerminees: { $sum: 1 },
      CoutMoyen: { $avg: "$costCents" },
      CoutTotal: { $sum: "$costCents" },
    },
  },
  {
    $project: {
      _id: 0,
      category: "$_id",
      InterventionsTerminees: 1,
      CoutMoyen: 1,
      CoutTotal: 1,
    },
  },
];

export default pipeline;
