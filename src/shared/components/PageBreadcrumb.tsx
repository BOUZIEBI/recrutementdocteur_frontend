import { useLocation } from 'react-router-dom';
import { adminItems, agentNavItems } from '@/data/navigation';
import { BiHomeAlt } from "react-icons/bi";

function PageBreadcrumb({ fallback, override }: { fallback?: string; override?: string }) {
  const { pathname } = useLocation();
  const navigation = [...adminItems, ...agentNavItems];
  const parent = navigation.find((item) => item.subItems?.some((child) => `/${child.id}` === pathname));
  const child = parent?.subItems?.find((item) => `/${item.id}` === pathname);
  const parentLabel = parent?.id === 'administration/agents' ? 'Agent' : parent?.label;
  const text = override ;

  return text ? <div className='breadcrumb-content'><BiHomeAlt size={16} /><p className="thumbnail" aria-label="Fil d’Ariane">{text}</p></div> : null;
}

export default PageBreadcrumb;
