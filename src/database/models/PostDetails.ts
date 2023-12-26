import { DataTypes, Model, Sequelize } from "sequelize";
import { PostDetails as PostDetailsAttributes } from "../attributes/PostDetails";
import PostTags from "./PostTags";
import RatingDetails from "./RatingDetails";

export type PostDetailsCreationAttributes = PostDetailsAttributes;

class PostDetails extends Model implements PostDetailsAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public title!: string;
  public shortDesc!: string;
  public imageUrl!: string;
  public description!: string;
  public categoryId!: number;
  public source!: string;
  public sourceUrl!: string;
  public sourceCreatedAt!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): void {
    PostDetails.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        shortDesc: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        categoryId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        source: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        sourceUrl: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        sourceCreatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW, // Add your specific default value here
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW, // Add your specific default value here
        },
      },
      {
        sequelize,
        underscored: true,
        tableName: "post_details",
      }
    );
  }

  static associate(models: {
    RatingDetails: typeof RatingDetails;
    PostTags: typeof PostTags;
  }): void {
    // Define association with Ratings
    PostDetails.hasMany(models.RatingDetails, {
      foreignKey: "post_id",
      onDelete: "CASCADE", // Delete ratings when a post is deleted
    });

    // Define association with PostTags
    PostDetails.hasMany(models.PostTags, {
      foreignKey: "post_id",
      onDelete: "CASCADE", // Delete post tags when a post is deleted
    });
  }
}

export default PostDetails;
