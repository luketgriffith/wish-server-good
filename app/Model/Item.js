'use strict'

const Lucid = use('Lucid')

class Item extends Lucid {
  user () {
        return this.belongsTo('App/Model/User')
    }
}

module.exports = Item
