export default function HeavyComponent() {
  console.log("🐘 HeavyComponent loaded");

  return (
    <div>
      <h2>🐘 Heavy Component</h2>
      <p>This component is loaded lazily</p>
    </div>
  );
}
