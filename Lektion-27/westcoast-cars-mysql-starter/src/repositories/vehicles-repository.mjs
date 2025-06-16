export default class VehicleRepository {
  constructor() {
    this.db = new Database();
  }

  // Lägg en ny bil...
  async add(vehicle) {}

  // Ta bort en bil...
  async delete(id) {}

  // Hämta en speciell bil...
  async find(id) {}

  // Hämta alla dokument över vilka bilar som finns i systemet...
  async list() {}

  // Uppdatera en bil...
  async update(vehicle) {}
}
