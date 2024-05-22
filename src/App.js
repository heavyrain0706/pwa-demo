import InstallPrompt from "./components/Install/InstallPromt";
import Layout from "./layout/Layout";
import AppRouter from "./router/AppRouter";


function App() {
  return (
    <Layout>
      <AppRouter />
      <InstallPrompt />
    </Layout>
  );
}

export default App;
