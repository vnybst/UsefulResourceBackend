import SequelizeConnection from "../connection";
import CategoryDetails from "./CategoryDetails";
import PostDetails from "./PostDetails";
import PostTags from "./PostTags";
import RatingDetails from "./RatingDetails";
import TagsDetails from "./TagsDetails";
import UserDetails from "./UserDetails";

const sequelize = SequelizeConnection.getInstance();
const models = {
  PostDetails,
  PostTags,
  RatingDetails,
  TagsDetails,
};

UserDetails.initModel(sequelize);
CategoryDetails.initModel(sequelize);
PostDetails.initModel(sequelize);
PostTags.initModel(sequelize);
TagsDetails.initModel(sequelize);
RatingDetails.initModel(sequelize);

UserDetails.associate(models);
PostDetails.associate(models);
PostTags.associate(models);
TagsDetails.associate(models);
RatingDetails.associate(models);

export const db = {
  sequelize,
  UserDetails,
  CategoryDetails,
  PostDetails,
  RatingDetails,
};
