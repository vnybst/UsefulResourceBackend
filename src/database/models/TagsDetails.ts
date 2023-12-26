import { Model, Sequelize, DataTypes } from "sequelize";
import PostTags from "./PostTags";
import { TagsDetails as TagsDetailsAttributes } from "../attributes";

export type TagsDetailsCreationAttributes = TagsDetailsAttributes;

class TagsDetails extends Model implements TagsDetailsAttributes {
  public id!: number;
  public name!: string;
  public count!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): void {
    TagsDetails.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
        count: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
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
        tableName: "tags",
      }
    );
  }

  static associate(models: { PostTags: typeof PostTags }): void {
    TagsDetails.belongsToMany(models.PostTags, {
      through: "post_tags",
      foreignKey: "id",
      otherKey: "post_id",
    });
  }
}

export default TagsDetails;
