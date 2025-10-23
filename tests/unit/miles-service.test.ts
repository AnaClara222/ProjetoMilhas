import * as repository from "../../src/repositories/miles-repository";
import * as calculator from "../../src/services/miles-calculator-service";
import { generateMilesForTrip, getMilesFromCode } from "../../src/services/miles-service";
import { createTrip } from "../factories/trip-factory"; // ← usa sua factory
describe("Miles Service Unit Tests", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should generate miles for a new trip (save and return miles)", async () => {
    jest.spyOn(repository, "findMiles").mockResolvedValue(null);
    jest.spyOn(repository, "saveMiles").mockResolvedValue(undefined);
    jest.spyOn(calculator, "calculateMiles").mockReturnValue(1234);

    const trip = createTrip(); 

    const miles = await generateMilesForTrip(trip);

    expect(miles).toBe(1234);
    expect(repository.findMiles).toHaveBeenCalledWith(trip.code);
    expect(repository.saveMiles).toHaveBeenCalledWith(trip.code, 1234);
  });

  it("should throw conflict error when miles already exist", async () => {
    jest.spyOn(repository, "findMiles").mockResolvedValue({ id: 1, code: "TRIP001", miles: 100 } as any);

    const trip = createTrip({ code: "TRIP001" });

    await expect(generateMilesForTrip(trip)).rejects.toEqual({
      type: "conflict",
      message: `Miles already registered for code TRIP001`,
    });
  });

  it("should return miles when code exists (getMilesFromCode)", async () => {
    jest.spyOn(repository, "findMiles").mockResolvedValue({ id: 3, code: "ABC123", miles: 7380 } as any);

    const result = await getMilesFromCode("ABC123");

    expect(result).toEqual({ id: 3, code: "ABC123", miles: 7380 });
    expect(repository.findMiles).toHaveBeenCalledWith("ABC123");
  });

  it("should throw not_found when code does not exist (getMilesFromCode)", async () => {
    jest.spyOn(repository, "findMiles").mockResolvedValue(null);

    await expect(getMilesFromCode("NOPE")).rejects.toEqual({
      type: "not_found",
      message: `Miles not found for code NOPE`,
    });
  });
});
