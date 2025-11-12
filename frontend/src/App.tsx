import './App.css'

import { ConnectKitButton } from 'connectkit'
import { Button } from "@/components/retroui/Button";



function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 space-y-4 bg-yellow-500">
  <h1 className="font-heading text-3xl">Welcome to Pundle</h1>
  <p className="font-body text-lg text-gray-800">
    An option-based lending & borrowing platform on top of Aave protocol and Arbitrium
  </p>
  <ConnectKitButton />
  <br />

    <Button variant="link">Click Me!</Button>

</div>

  )
}

export default App
