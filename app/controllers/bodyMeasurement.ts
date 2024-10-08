import * as user from "./user";


/**
 * Method to save body measurement data to db
 * Note: chest, abdomen, and thigh are optional in db, but are required if bypass flag is true on UI
 */
export const saveMeasurement = async (
    weight: number,
    chest: number | null,
    abdomen: number | null,
    thigh: number | null,
    bypassMeasurementFlag: boolean,
    bodyFatPercent: number,
    muscleMass: number
  ) => {
    try {
      const response = await fetch(
        // local testing
        // `http://10.10.6.150:8080/measurement/save`,
  
        // production
        "https://7u45qve0xl.execute-api.ca-central-1.amazonaws.com/dev/measurement/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await user.getToken()}`,
          },
          body: JSON.stringify({
            weight,
            chest,
            abdomen,
            thigh,
            bypassMeasurementFlag,
            bodyFatPercent,
            muscleMass,
          }),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Sign-up failed");
      }
  
      const data = await response.json();
      return data;
    } catch (error: any) {
      throw new Error(error.message || "Something went wrong");
    }
  };