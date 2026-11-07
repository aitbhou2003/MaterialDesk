const pipeline = [
  // Tes étapes ici
  {
    $match: {
      status: "RETURNED",
    },
  },
  {
    $group: {
      _id: "$memberId",
      pretRendus: {
        $sum: 1,
      },
      recettes: { $sum: "$feeCents" },
    },
  },

  {
    $project: {
      _id: 0,
      momberId: "$_id",
      pretRendus: "$pretRendus",
      recettes: "$recettes",
    },
  },
  {
    $sort : {
      recettes : -1
    }
  }
];

export default pipeline;
