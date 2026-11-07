const pipeline = [
  {
    $match: {
      status: "RETURNED",
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
    $lookup: {
      from: "members",
      localField: "memberId",
      foreignField: "_id",
      as: "members",
    },
  },
  {
    $unwind: "$members",
  },
  {
    $match: {
      "members.active": true,
    },
  },

  {
    $group: {
      _id: "$members.city",
      PretsRendusAdmissibles: { $sum: 1 },
      Recettes: { $sum: "$feeCents" },
    },
  },

  {
    $project: {
      _id: 1,
      PretsRendusAdmissibles: 1,
      Recettes: 1,
    },
  },
];

export default pipeline;
