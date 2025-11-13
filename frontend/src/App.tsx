import { useEffect, useState } from "react";
import "./index.css";
import AppRoutes from "./Routing/routes";
import { Loader } from "./components/retroui/Loader";
// 👈 create this if not already

export function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    <div className="flex items-center justify-center h-screen w-full ">
      <Loader size="lg"
        variant="secondary"

        count={4}
        duration={4}
        delayStep={120}
        className="my-4"
      />
    </div>
  }

  return <AppRoutes />;
}

export default App;
