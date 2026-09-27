export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { artist, email, deal } = req.body;

  try {
    const dbRes = await fetch(
      "https://evenup-portal-1d3c.restdb.io/rest/onboarding",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": process.env.RESTDB_KEY
        },
        body: JSON.stringify({ artist, email, deal })
      }
    );

    const result = await dbRes.json();
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("RESTdb error:", err);
    return res.status(500).json({ error: "RESTdb submission failed" });
  }
}
