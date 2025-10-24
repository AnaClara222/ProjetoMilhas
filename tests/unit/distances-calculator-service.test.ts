import { calculateDistance, toRadius, applyHaversineFormula } from "../../src/services/distances-calculator-service";

describe("Distances Calculator Service Unit Tests", () => {

  it("should convert degrees to radians correctly", () => {
    expect(toRadius(180)).toBeCloseTo(Math.PI);
    expect(toRadius(90)).toBeCloseTo(Math.PI / 2);
  });

  it("should apply Haversine formula correctly", () => {
    const lat1 = 0;
    const lat2 = Math.PI / 2;
    const dLat = Math.PI / 2;
    const dLon = 0;
    const radius = 6371; 
    const distance = applyHaversineFormula(lat1, lat2, dLat, dLon, radius);

    expect(distance).toBeGreaterThan(0);
  });

  it("should calculate distance between two locations in km", () => {
    const coords1 = { lat: 0, long: 0 };
    const coords2 = { lat: 0, long: 1 };
    const distance = calculateDistance(coords1, coords2);
    expect(distance).toBeGreaterThan(0);
  });

  it("should calculate distance between two locations in miles", () => {
    const coords1 = { lat: 0, long: 0 };
    const coords2 = { lat: 0, long: 1 };
    const distance = calculateDistance(coords1, coords2, true);
    expect(distance).toBeGreaterThan(0);
  });

});