import { Model } from 'objection';

export default class Group extends Model {
  static get tableName () {
    return 'groups';
  }
}