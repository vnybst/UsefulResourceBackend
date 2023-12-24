import { Model, Sequelize, DataTypes } from "sequelize";
import { SubCategoryDetails as SubCategoryDetailsAttributes } from "../attributes";
import CategoryDetails from "./CategoryDetails";

export type UserDetailsCreationArrtibutes = SubCategoryDetailsAttributes;

class SubCategoryDetails extends Model implements SubCategoryDetailsAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public description!: string;
  public categoryId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): void {
    SubCategoryDetails.init(
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
        categoryId: {
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
        tableName: "subCategoryDetails",
      }
    );

    // Define the foreign key relationship
    SubCategoryDetails.belongsTo(CategoryDetails, {
      foreignKey: "categoryId", // The foreign key in the SubcategoryDetails model
      targetKey: "id", // The target key in the referenced model
    });
  }
}

export default SubCategoryDetails;
