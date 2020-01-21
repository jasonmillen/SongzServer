import { Model } from 'objection';

export default class User extends Model {
  static get tableName () {
    return 'users';
  }

  static get relationMappings () {

    const Group = require('./group');

    return {
      groups: {
        relation: Model.ManyToManyRelation,
        modelClass: Group,
        join: {
          from: 'users.id',
          through: {
            from: 'usersgroups.userid',
            to: 'usersgroups.groupid'
          },
          to: 'groups.id'
        }
      }
    }
  }
};