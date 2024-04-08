// UserData.js
const fetchUserData = async () => {
  try {
    const response = await fetch(
      "https://mocki.io/v1/a0f57a34-3afb-467e-94dd-b6fc5d2e28af"
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
};

export default fetchUserData;
