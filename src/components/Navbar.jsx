function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-6 border-b border-white/10 backdrop-blur-xl bg-white/5">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        <Navbar />
        AI StudyFlow
      </h1>

      <button className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
        Dashboard
      </button>
    </nav>
  );
}

export default Navbar;