// Production/Testing flag
let production = true; // Set to true in Production
let endpoint = production ? `https://7u45qve0xl.execute-api.ca-central-1.amazonaws.com/dev` : `http://10.0.0.44:8080`; // Replace with your own ip4 address for test
const isDemoMode = false;

export { production, endpoint, isDemoMode };