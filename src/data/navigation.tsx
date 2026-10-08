import { FiHome, FiClipboard, FiUser, FiCalendar, FiRepeat, FiFileText, FiAward, FiHeart, FiGrid, FiUsers, FiUserPlus, FiBarChart2, FiShield, FiLayers, FiCheckCircle } from 'react-icons/fi';
import type React from 'react';
import { FiRss, FiVolume2, FiBriefcase, FiImage } from 'react-icons/fi';



export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  subItems?: NavItem[];
}


export const agentNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Accueil', icon: <FiHome className="nav-icon" /> },
  { id: 'resume-fiche-identification', label: 'Résumé Fiche d’identification', icon: <FiClipboard className="nav-icon" /> },
  {
    id: 'fiche-identification',
    label: 'Fiche d’identification',
    icon: <FiUser className="nav-icon" />,
    subItems: [
      { id: 'fiche-identification/informations-generales', label: 'Informations Générales' },
      { id: 'fiche-identification/enfants', label: 'Liste des Enfants' },
      { id: 'fiche-identification/services', label: 'Services' },
      { id: 'fiche-identification/autres-services', label: 'Autres services' },
      { id: 'fiche-identification/etudes-formations-diplomes', label: 'Études, Formations professionnelles, Diplômes' },
      { id: 'fiche-identification/stages-colloques', label: 'Stage, Colloque' },
      { id: 'fiche-identification/enseignements', label: 'Enseignements dispensés' },
      { id: 'fiche-identification/publications', label: 'Publications' },
      { id: 'fiche-identification/activites-recherche', label: 'Activités de recherches' },
      { id: 'fiche-identification/emplois', label: 'Emplois occupés' },
      { id: 'fiche-identification/fonctions', label: 'Fonctions occupées' },
      { id: 'fiche-identification/competences', label: 'Résumé des compétences' },
      { id: 'fiche-identification/autres-renseignements', label: 'Autres renseignements' },
      { id: 'fiche-identification/consultation', label: 'Consultation de la fiche d’identification' },
    ],
  },
  { id: 'presences', label: 'Présences', icon: <FiCalendar className="nav-icon" /> },
  { id: 'mouvements', label: 'Mouvements', icon: <FiRepeat className="nav-icon" /> },
  { id: 'attestations', label: 'Attestations', icon: <FiFileText className="nav-icon" /> },
  { id: 'certificats', label: 'Certificats', icon: <FiAward className="nav-icon" /> },
  { id: 'prestation-sociale', label: 'Prestation sociale et autres', icon: <FiHeart className="nav-icon" /> },
];

export const adminItems: NavItem[] = [
  { id: 'administration/dashboard', label: 'Tableau de bord', icon: <FiGrid className="nav-icon" /> },
  {
    id: 'administration/agents',
    label: 'Agents',
    icon: <FiUsers className="nav-icon" />,
    subItems: [
      { id: 'administration/agents/liste', label: 'Liste des agents' },
      { id: 'administration/agents/ajouter', label: 'Ajouter un agent' },
      { id: 'administration/agents/absences', label: 'Gestion des absences' },
      { id: 'administration/agents/mouvements', label: 'Gestion des Mouvements' },
      { id: 'administration/agents/attestations', label: 'Gestion des Attestations' },
      { id: 'administration/agents/certificats', label: 'Gestion des Certificats' },
      { id: 'administration/agents/prestation-sociale', label: 'Prestation sociale et autres' },
    ],
  },
  { id: 'administration/besoins-rh', label: 'Besoins en RH', icon: <FiUserPlus className="nav-icon" /> },
  { id: 'administration/presences', label: 'Présences', icon: <FiCalendar className="nav-icon" /> },
  { id: 'administration/statistiques', label: 'Statistiques', icon: <FiBarChart2 className="nav-icon" /> },
  { id: 'administration/attestations', label: 'Attestations', icon: <FiFileText className="nav-icon" /> },
  { id: 'administration/certificats', label: 'Certificats', icon: <FiAward className="nav-icon" /> },
  { id: 'administration/mouvements', label: 'Mouvements', icon: <FiRepeat className="nav-icon" /> },
  { id: 'administration/roles', label: 'Rôles', icon: <FiShield className="nav-icon" /> },
  { id: 'administration/structures', label: 'Structures', icon: <FiLayers className="nav-icon" /> },
  { id: 'administration/verification', label: 'Vérification', icon: <FiCheckCircle className="nav-icon" /> },
  { id: 'administration/actualites', label: 'Actualités', icon: <FiRss className="nav-icon" /> },
  { id: 'administration/communiques', label: 'Communiqués', icon: <FiVolume2 className="nav-icon" /> },
  { id: 'administration/services', label: 'Services', icon: <FiBriefcase className="nav-icon" /> },
  { id: 'administration/phototheque', label: 'Photothèque', icon: <FiImage className="nav-icon" /> },
];
