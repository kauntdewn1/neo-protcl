import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NeoProtocol from './pages/home/NeoProtocol';
import MCPConsole from './pages/mcp-console';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NeoProtocol />} />
        <Route path="/neo-protocol" element={<NeoProtocol />} />
        <Route path="/mcp" element={<MCPConsole />} />
      </Routes>
    </Router>
  );
}

export default App;

