class Storage {
  constructor() {
    this._storage = {};
  }
  // info = {lat: 0, lon: 0}
  addBuoy(name, info) {
    this._storage[name] = info;
  }
  // info = {height: 0, period: 0}
  updateBuoyData(name, info) {
    this._storage[name] = Object.assign(this._storage[name], info);
  }
  // subscribedBuoy(params, id) {
  //   this.storage[id] = Object.assign(this._storage[id], params);
  // }
  // buoyNotification(params, id) {
  //   this.storage[id] = Object.assign(this._storage[id], params);
  // }
  get storage() {
    return this._storage;
  }
}

module.exports = Storage;
