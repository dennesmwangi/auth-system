import { Link } from "react-router-dom";
function NotFound() {
  return (
    <>
      <div>
        <h2>Oops!</h2>
        <p>The requested page was not found!</p>
        <Link to="/">Back home</Link>
      </div>
    </>
  );
}

export default NotFound;
