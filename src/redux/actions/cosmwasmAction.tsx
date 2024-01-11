import { HANDLE_STORE_DATA, HANDLE_INSTANTIATE_DATA, HANDLE_EXECUTE_DATA, HANDLE_MIGRATE_DATA } from '../types';

export const handleStoreData = (accessConfig: number, address: string) => ({
  type: HANDLE_STORE_DATA,
  accessConfig,
  address,
});

export const handleInstantiateData = (codeId: string, funds: string, label: string, args: string) => ({
  type: HANDLE_INSTANTIATE_DATA,
  codeId,
  funds,
  label,
  args,
});

export const handleExecuteData = (address: string, funds: string, args: string) => ({
  type: HANDLE_EXECUTE_DATA,
  address,
  funds,
  args,
});

export const handleMigrateData = (address: string, codeId: string, args: string) => ({
  type: HANDLE_MIGRATE_DATA,
  address,
  codeId,
  args,
});
