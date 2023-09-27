function Navbar() {
  return (
    <nav className="px-3 py-5 text-white font-bold bg-black">
      <div className="flex gap-3 max-w-[1200px]" style={{margin: '0 auto'}}>
        <img className="w-[24px]" src="/logo.jpeg" alt="" />
        <span>Nöbetçi Eczaneler</span>
      </div>
    </nav>
  );
}

export default Navbar;
