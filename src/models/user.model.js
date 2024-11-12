module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "Users",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      firstName: { type: Sequelize.STRING },
      lastName: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING, unique: true },
      password: { type: Sequelize.STRING },
      mediaId: { type: Sequelize.INTEGER },
      metadata: { type: Sequelize.JSON },
    },
    { timestamps: true, paranoid: true }
  );
  User.associate = (models) => {
    User.belongsTo(models.media, { foreignKey: "mediaId", as: "media" });
  };
  return User;
};
