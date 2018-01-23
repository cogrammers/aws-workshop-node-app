'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    githubLink: {
      type: DataTypes.STRING
    },
    imageLink: {
      type: DataTypes.STRING
    },
  });

  return Project;
}
//     classMethods: {
//       associate: function(models) {
//         // associations can be defined here
//       }
//     }
//   });
//   return Project;
// };
