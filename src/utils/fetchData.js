export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': 'bce7f1ccf8msh5e03d3a605653e7p100720jsn23d33581aa2',
  },
};

// ----------------------
// SAFE fetchData
// ----------------------
export const fetchData = async (url, options) => {
  try {
    const res = await fetch(url, options);

    // Handle non-200 responses
    if (!res.ok) {
      const errorMessage = await res.text();
      console.error("API error:", errorMessage);

      return {
        error: true,
        status: res.status,
        message: errorMessage,
      };
    }

    const data = await res.json();

    // If API returns non-array but we expect array → fix crash
    if (data?.message && data.message.includes("Too many requests")) {
      console.error("RATE LIMIT ERROR:", data);
      return { error: true, status: 429, message: "Too many requests" };
    }

    return data;
    console.log(data);

  } catch (err) {
    console.error("FETCH FAILED:", err);
    return { error: true, message: err.message };
  }
};
