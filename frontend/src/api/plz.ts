export const fetchPlzRequest = async (jwt: string) => {
    const response = await fetch("http://localhost:8080/api/plz/getAll", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (!response.ok) throw new Error('Network response was not ok');
    console.log("Response:", response);
    return response.json(); // Korrektur: json() muss aufgerufen werden
  }