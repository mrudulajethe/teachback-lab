// Retired prototype endpoint. Teaching now uses mission-scoped validated requests.
export function POST() {
  return Response.json(
    { error: "Use /api/teachback with a mission and explanation." },
    { status: 410 },
  );
}
