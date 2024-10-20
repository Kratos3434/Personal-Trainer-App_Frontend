import { router } from "expo-router";
import {getToken} from "./user";

export class Profile {
    private _dob: string;
    private _gender: string;
  
    constructor(dob: string, gender: string) {
      this._dob = dob;
      this._gender = gender;
    }

    // Getter for dob
    get dob(): string {
      return this._dob;
    }
  
    // Setter for dob
    set dob(value: string) {
      // You can add validation or formatting here if needed
      this._dob = value;
    }
  
    // Getter for gender
    get gender(): string {
      return this._gender;
    }
  
    // Setter for gender
    set gender(value: string) {
      // You can add validation or formatting here if needed
      this._gender = value;
    }

    static async createProfile(dob: string, gender: string) {
        try {
            const response = await fetch(
              "https://7u45qve0xl.execute-api.ca-central-1.amazonaws.com/dev/user/profile/enter",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${await getToken()}`
                },
                body: JSON.stringify({ dob, gender }),
              }
            );
        
            // Check if the response is OK (status code 2xx)
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Check if the response has JSON content
            const contentType = response.headers.get("Content-Type") || "";
            if (contentType.includes("application/json")) {
              
              const res = await response.json();
              console.log(res);

              if (res.status) {
                return res;
              } else {
                throw new Error(res.error || "Submission failed");
              }
            } else {
              throw new Error("Expected JSON response, but got something else.");
            }
          } catch (err: any) {
            console.error(err.message + ": Submit Failed");
          }
    }

    static async setProfileByToken(setProfile: any) {
      console.log("Setting profile");
      const res = await fetch("https://7u45qve0xl.execute-api.ca-central-1.amazonaws.com/dev/user/profile?initBodyMeasurement=true", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getToken()}`
        }
      });

      const data = await res.json();
      console.log(data.data)
      setProfile(data.data);
    }

    static async update({gender, dob}: {gender?: string, dob?: Date}) {
      const res = await fetch("https://7u45qve0xl.execute-api.ca-central-1.amazonaws.com/dev/user/profile/update", {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getToken()}`
        },
        body: JSON.stringify({
          gender,
          dob
        })
      });

      const data = await res.json();

      return data;
    }
}
    