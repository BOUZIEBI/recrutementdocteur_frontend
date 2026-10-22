
import PageBreadcrumb from '@/shared/components/PageBreadcrumb';


function AdministrationPage({ title, breadcrumb }: { title: string; breadcrumb?: string }) {
  return (
    <div className="">
      <div className="titre-libelle-page">
        <h3>Système de Gestion des Ressources Humaines du MESRS</h3>
        <p> <b>Espace Administrateur</b> </p>
        <PageBreadcrumb fallback={title} override={breadcrumb} />
      </div>
      <div className="content-section">
        <h1>{title}</h1>
        <div className='informations-section'>
            <p>Bienvenue dans la rubrique « {title} » de votre espace administrateur.</p>
        </div>
        
      </div>
      
    </div>
  );
}

export default AdministrationPage;
