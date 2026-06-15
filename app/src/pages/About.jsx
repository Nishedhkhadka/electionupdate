import { Link } from "react-router-dom";

export default function About() {
  return (
    <main>
      <h1>About</h1>
      <p>This is a minimal React Router setup.</p>
      <p>
        <Link to="/">Back home</Link>
      </p>
    </main>
  );
}
