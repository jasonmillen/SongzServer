import { Model } from 'objection';

import User from './user';
import UserGroup from './userGroup';

export default class Group extends Model {
  static get tableName () {
    return 'groups';
  }

  static get relationMappings () {

    const Group = require('./group');

    return {
      usersgroups: {
        relation: Model.HasManyRelation,
        modelClass: UserGroup,
        join: {
          from: 'groups.id',
          to: 'usersgroups.groupid'
        }
      },
      group: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
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
}