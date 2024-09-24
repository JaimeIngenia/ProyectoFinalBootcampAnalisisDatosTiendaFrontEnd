export interface ProdctGeneralSelects {
  roles: Role[];
  rolesLoading: LoadingState;
}

export interface Role {
  id: number;
  nombre: string;
}

export interface LoadingState {
  state: ResponseState;
  status: boolean;
  message?: string;
}

export enum ResponseState {
  Started,
  InProgress,
  Finished,
  Waiting,
}
