import { Model, Sequelize, DataTypes } from "sequelize";
import { UserDetails as UserDetailsAttributes } from "../attributes";
import PostDetails from "./PostDetails";

export type UserDetailsCreationArrtibutes = UserDetailsAttributes;

class UserDetails extends Model implements UserDetailsAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public email!: string;
  public accessToken!: string;
  public refreshToken!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  //   public static associations: {};

  static initModel(sequelize: Sequelize): void {
    UserDetails.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING(100),
          unique: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        accessToken: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        refreshToken: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        underscored: true,
        tableName: "user_details",
      }
    );
  }

  static associate(models: { PostDetails: typeof PostDetails }): void {
    UserDetails.hasMany(models.PostDetails, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
  }
}

export default UserDetails;
