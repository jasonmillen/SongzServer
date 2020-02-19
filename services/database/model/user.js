import { Model } from 'objection';

import Group from './group';

export default class User extends Model {
  static get tableName () {
    return 'users';
  }

  static get relationMappings () {

    const Group = require('./group');

    return {
      user: {
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