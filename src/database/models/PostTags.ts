import { DataTypes, Model, Sequelize } from "sequelize";
import { PostTags as PostTagsAttributes } from "../attributes/PostTags";
import PostDetails from "./PostDetails";

export type PostTagsCreationAttributes = PostTagsAttributes;

class PostTags extends Model implements PostTagsAttributes {
  public id!: number;
  public postId!: number;
  public tagId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    PostTags.init(
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
        tagId: {
          type: DataTypes.STRING(50),
          allowNull: false,
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
        tableName: "post_tags",
      }
    );
  }

  static associate(models: { PostDetails: typeof PostDetails }): void {
    // Define association with PostDetails
    PostTags.belongsTo(models.PostDetails, {
      foreignKey: "post_id",
      onDelete: "CASCADE", // Delete post tags when associated post is deleted
    });
  }
}

export default PostTags;
