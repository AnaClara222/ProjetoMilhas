import { calculateMiles } from "../../src/services/miles-calculator-service";
import { createTrip } from "../factories/trip-factory";
import { ServiceClass, AffiliateStatus } from "../../src/protocols";
import * as distanceService from "../../src/services/distances-calculator-service";

describe("Miles Calculator Service Unit Tests", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  
  it("should calculate miles based on distance and class multiplier", () => {
    const trip = createTrip({
      miles: false,
      service: ServiceClass.FIRST_CLASS,
      affiliate: AffiliateStatus.BRONZE,
      date: "2024-01-01", 
    });

    trip.origin = { lat: 0, long: 0 };
    trip.destination = { lat: 0, long: 1 };

    jest.spyOn(distanceService, "calculateDistance").mockReturnValue(111);

    const result = calculateMiles(trip);

    const serviceMultiplier = 2; 
    const expected = Math.round(111 * serviceMultiplier);

    expect(result).toBe(expected);
  });


  it("should add affiliate bonus", () => {
    const trip = createTrip({
      miles: false,
      service: ServiceClass.ECONOMIC,
      affiliate: AffiliateStatus.GOLD, 
      date: "2024-01-01", 
    });

    trip.origin = { lat: 0, long: 0 };
    trip.destination = { lat: 0, long: 1 };

    jest.spyOn(distanceService, "calculateDistance").mockReturnValue(111);

    const result = calculateMiles(trip);

    const serviceMultiplier = 1; 
    const base = 111 * serviceMultiplier; 
    const affiliateBonus = 0.25; 
    
    const expected = Math.round(base + base * affiliateBonus);

    expect(result).toBe(expected);
  });

  it("should add birthday month bonus (May)", () => {
    const trip = createTrip({
      miles: false,
      service: ServiceClass.ECONOMIC,
      affiliate: AffiliateStatus.BRONZE, 
      date: "2024-05-10", 
    });

    trip.origin = { lat: 0, long: 0 };
    trip.destination = { lat: 0, long: 1 };

    jest.spyOn(distanceService, "calculateDistance").mockReturnValue(111);

    const result = calculateMiles(trip);

    const serviceMultiplier = 1; 
    const base = 111 * serviceMultiplier; 
    const birthdayBonus = 0.1; 
    
    const expected = Math.round(base + base * birthdayBonus);

    expect(result).toBe(expected);
  });
  
  it("should not calculate miles if miles = true", () => {
    const trip = createTrip({
      miles: true, // Paga com milhas
      service: ServiceClass.FIRST_CLASS,
      affiliate: AffiliateStatus.PLATINUM,
      date: "2024-05-10",
    });

    trip.origin = { lat: 0, long: 0 };
    trip.destination = { lat: 0, long: 1 };
    
    const result = calculateMiles(trip);

    expect(result).toBe(0);
  });
});