export default function Header() {
  return (
    <nav className=" flex flex-row justify-between items-center">
      <div className="left-container">
        <div>
          <img
            className="h-auto w-32"
            src="https://user-images.githubusercontent.com/64256342/194090296-bfc6a7ef-1fb6-41ac-bed5-fa39759e5dbc.png"
            alt="Logo"
          />
        </div>
      </div>
      <div className="right-container flex flex-row justify-evenly items-center text-xl font-mono">
        <div className="text-yellow-200 bg-gray-700 shadow-lg p-2 rounded-md">
          Version 1.0.0
        </div>
      </div>
    </nav>
  );
}
