export interface ProdctGeneralSelects {
  roles: Entity[];
  rolesLoading: LoadingState;
  categorias: Entity[];
  categoriasLoading: LoadingState;
}

export interface Entity {
  id: number;
  nombre: string;
}

export interface LoadingState {
  state: ResponseState;
  status?: boolean;
  message?: string;
}

export enum ResponseState {
  Started,
  InProgress,
  Finished,
  Waiting,
}
