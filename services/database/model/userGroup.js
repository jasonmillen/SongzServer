import { Model } from 'objection';

export default class UserGroup extends Model {
  static get tableName () {
    return 'usersgroups';
  }

  static get idColumn () {
    return ['userid', 'groupid']
  }
};