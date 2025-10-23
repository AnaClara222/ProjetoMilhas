import { faker } from "@faker-js/faker";
import { Trip, ServiceClass, AffiliateStatus } from "../../src/protocols";

export function createTrip(overrides: Partial<Trip> = {}): Trip {
  return {
    code: faker.string.alphanumeric(8),
    origin: {
      lat: faker.location.latitude(),
      long: faker.location.longitude()
    },
    destination: {
      lat: faker.location.latitude(),
      long: faker.location.longitude()
    },
    miles: false,
    plane: faker.airline.airplane().name,
    service: faker.helpers.arrayElement([
      ServiceClass.ECONOMIC,
      ServiceClass.ECONOMIC_PREMIUM,
      ServiceClass.EXECUTIVE,
      ServiceClass.FIRST_CLASS
    ]),
    affiliate: faker.helpers.arrayElement([
      AffiliateStatus.BRONZE,
      AffiliateStatus.SILVER,
      AffiliateStatus.GOLD,
      AffiliateStatus.PLATINUM
    ]),
    date: faker.date.past().toISOString().split("T")[0],
    ...overrides
  };
}
