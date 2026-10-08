export { default as ServicesListPage } from './pages/ServicesListPage';
export { default as ServiceDetailPage } from './pages/ServiceDetailPage';
export {fetchServiceByUid, fetchServices} from './api/service.api';
export { useServices, useServiceById } from './hooks/useServices';
export type { Service } from './types/service.types';




