export default function Home() {
  return (
    <main style={{ fontFamily: "monospace", padding: 40, background: "#030712", color: "#f59e0b", minHeight: "100vh" }}>
      <h1>⚡ Lalit KGS Proxy</h1>
      <p style={{ color: "#6b7280" }}>API proxy is running. Use /api/proxy/* endpoints.</p>
      <ul style={{ color: "#9ca3af", lineHeight: 2 }}>
        <li>GET /api/proxy — health check</li>
        <li>GET /api/proxy/batch_list</li>
        <li>GET /api/proxy/classroom/:course_id</li>
        <li>GET /api/proxy/lesson/:lesson_id</li>
        <li>GET /api/proxy/video/:video_id</li>
        <li>GET /api/proxy/clear_cache</li>
      </ul>
    </main>
  );
}

