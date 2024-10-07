// paymobHelper.js
export const firstStep = async (apiKey, setToken) => {
  let data = {
    api_key: apiKey,
  };

  try {
    const request = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let response = await request.json();
    if (response.token) {
      setToken(response.token);
    } else {
      console.error("Error fetching token:", response);
    }
  } catch (error) {
    console.error("Error in firstStep:", error.message);
  }
};
