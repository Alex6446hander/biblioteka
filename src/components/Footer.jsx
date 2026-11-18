import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-border py-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-muted-foreground text-sm">
          СУД — Система управления документами
        </div>
        <div className="text-muted-foreground text-sm">
          2024
        </div>
      </div>
    </footer>
  );
};

export default Footer;
