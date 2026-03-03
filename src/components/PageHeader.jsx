import React from 'react';

export function PageHeader({ title, subtitle }) {
  return (
    <header className="page-header">
      <div className="page-header-inner container">
        <h1 className="page-header-title">{title}</h1>
        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
      </div>
    </header>
  );
}
