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
    $match : {
        "equipments.archived" : false
    }
  },

  {
    $group: {
      _id: "$equipments.category",
      prets : {$sum : 1},
      dureeMoyenne : {
        $avg : "$durationDays"
      },
      recettes : {$sum : "$feeCents"}
    },
  },

  
 

  {
    $project:{
        _id : 1,
        category : "$equipments.category",
        prets : 1,
        dureeMoyenne : 1,
        recettes : 1
    }
  },
  {
    $sort : {
        recettes : -1
    }
  }
];

export default pipeline;
