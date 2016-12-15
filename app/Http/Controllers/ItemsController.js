'use strict'

const Item = use('App/Model/Item');
const User = use('App/Model/User');
const Database = use('Database');


class ItemsController {
  * index (request, response) {
    let data = request.all();

    const user = yield User.find(data.friend.profile_id);
    const items = yield user.items().fetch();

    const itemsJson = items.toJSON();
    response.ok(itemsJson)
  }
  * claimGift (request, response) {
    let data = request.all();
    console.log('teh dats: ', data);
    yield Database.table('items').where('id', data.item.id).update({ claimed: data.claim, claimed_by: data.user.id });
    const item = yield Item.find(data.item.id);
    response.ok(item);
  }

  * singleItem (request, response) {
    let id = request.params('id');
    console.log('the id...', id)
    const item = yield Item.find(id.id);
    console.log('item...', item);
    response.ok(item);
  }

  * myItems (request, response) {
    let id = request.params('id')
    console.log('id: ', id);
    const user = yield User.find(id.id);
    console.log('user: ', user);
    const items = yield user.items().fetch();
    const itemsJson = items.toJSON();
    response.ok(itemsJson);
  }

  * add (request, response) {
    let data = request.all();
    console.log('the data...', data)
    let user = yield User.find(data.user);
    let item = new Item();
    item.img_url = data.img_url;
    item.description = data.description;
    yield user.items().save(item);

    response.ok(item);
  }

  * deleteItem (request, response) {
    let id = request.params('id')
    let item = yield Item.find(id.id);
    yield item.delete();
    response.ok({ success: true });
  }
}

module.exports = ItemsController
