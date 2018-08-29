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
    var updatedBuoy = Object.assign(this._storage[name], info);
    this._storage[name] = updatedBuoy;
    updatedBuoy.name = name;
    return updatedBuoy;
  }
  subscribeToBuoys(bounds) {
    const subscribedBuoys = [];
    Object.keys(this._storage).forEach(id => {
      const buoy = this._storage[id];
      buoy.name = id;
      const insideBounds =
        bounds.south <= buoy.lat &&
        buoy.lat <= bounds.north &&
        bounds.west <= buoy.lon &&
        buoy.lon <= bounds.east;
      if (insideBounds) subscribedBuoys.push(buoy);
    });
    return subscribedBuoys;
  }
  get storage() {
    return this._storage;
  }
}

module.exports = Storage;
