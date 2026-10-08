function Dashboard() {
  return (
  <div className="content-section">
    <h1>Tableau de Bord</h1>
    <div className="dashboard-grid">
      <div className="card">
        <h3>Bienvenue</h3>
        <p>Bienvenue sur le tableau de bord de l'application.</p>
      </div>
      <div className="card">
        <h3>Statistiques</h3>
        <p>Consultez vos statistiques et données importantes.</p>
      </div>
      <div className="card">
        <h3>Raccourcis</h3>
        <p>Accédez rapidement aux fonctionnalités principales via le menu latéral.</p>
      </div>
    </div>
  </div>
  );
}

export default Dashboard;
