module.exports = (sequelize, Sequelize) => {
  const Media = sequelize.define(
    "Medias",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        values: ["image", "video", "audio", "document", "other"],
      },
      name: {
        type: Sequelize.STRING,
      },
      mimeType: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.INTEGER,
      },
      url: {
        type: Sequelize.STRING,
      },
      metadata: {
        type: Sequelize.JSON,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return Media;
};
