import { Model, Sequelize, DataTypes } from "sequelize";
import { CategoryDetails as CategoryDetailsAttributes } from "../attributes";

export type UserDetailsCreationArrtibutes = CategoryDetailsAttributes;

class CategoryDetails extends Model implements CategoryDetailsAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public description!: string;
  public parentCategoryId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): void {
    CategoryDetails.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        parentCategoryId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        underscored: true,
        tableName: "categoryDetails",
      }
    );

    // Define the foreign key relationship
    CategoryDetails.belongsTo(CategoryDetails, {
      as: "parentCategory", // Alias for the relation
      foreignKey: "parentCategoryId", // The foreign key in the current model
      targetKey: "id", // The target key in the referenced model
    });
  }
}

export default CategoryDetails;
