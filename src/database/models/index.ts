import SequelizeConnection from "../connection";
import CategoryDetails from "./CategoryDetails";
import UserDetails from "./UserDetails";

const sequelize = SequelizeConnection.getInstance();

UserDetails.initModel(sequelize);
CategoryDetails.initModel(sequelize);

export const db = {
  sequelize,
  UserDetails,
  CategoryDetails,
};
