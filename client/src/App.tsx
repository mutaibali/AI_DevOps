import { useEffect, useState } from "react";

type BackendData = {
  users: string[];
};

function App() {
  const [backendData, setBackendData] = useState<BackendData>({ users: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5001/api") // 👈 backend URL
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((data: BackendData) => {
        setBackendData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        Dashboard
      </h1>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <ul className="mt-4 space-y-2">
          {backendData.users.length > 0 ? (
            backendData.users.map((user, i) => (
              <li
                key={i}
                className="rounded-lg bg-gray-100 dark:bg-gray-800 p-2 text-gray-800 dark:text-gray-200"
              >
                {user}
              </li>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default App;
