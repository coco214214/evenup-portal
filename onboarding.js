import { useState } from "react";

export default function Onboarding() {
  const [artist, setArtist] = useState("hhh");
  const [email, setEmail] = useState("gg@gmail.com");
  const [deal, setDeal] = useState("Exclusive Recording");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch("/api/submit-onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artist, email, deal })
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      await res.json();
      alert("Submission sent to EVENUP successfully.");
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Error submitting. Check console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h2>Review & Submit</h2>
      <p>Confirm your details before sending your submission.</p>

      <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 8, width: 320 }}>
        <label style={{ fontWeight: "bold", marginTop: 10 }}>Artist</label>
        <input
          value={artist}
          onChange={e => setArtist(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <label style={{ fontWeight: "bold", marginTop: 10 }}>Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <label style={{ fontWeight: "bold", marginTop: 10 }}>Deal</label>
        <input
          value={deal}
          onChange={e => setDeal(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            marginTop: 20,
            padding: "10px 20px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          {loading ? "Submitting..." : "Submit to EVENUP"}
        </button>
      </div>
    </main>
  );
}
