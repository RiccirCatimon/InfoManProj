export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl">HOPE-HRS</h1>
        <span>Logged In</span>
      </div>
    </nav>
  );
}