import SequelizeConnection from "../connection";
import UserDetails from "./UserDetails";

const sequelize = SequelizeConnection.getInstance();

UserDetails.initModel(sequelize);

export const db = {
  sequelize,
  UserDetails,
};
