import { DataTypes, Model, Sequelize } from "sequelize";
import PostDetails from "./PostDetails";
import { RatingDetails as RatingDetailsAttributes } from "../attributes";

export type RatingDetailsCreationAttributes = RatingDetailsAttributes;

class RatingDetails extends Model implements RatingDetailsAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public postId!: number;
  public userId!: number;
  public ratingValue!: number;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    RatingDetails.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        postId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        ratingValue: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
            max: 5,
          },
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        sequelize,
        underscored: true,
        tableName: "rating_details",
      }
    );
  }

  static associate(models: { PostDetails: typeof PostDetails }): void {
    // Define association with PostDetails
    RatingDetails.belongsTo(models.PostDetails, {
      foreignKey: "post_id",
      onDelete: "CASCADE", // Delete ratings when associated post is deleted
    });
  }
}

export default RatingDetails;
