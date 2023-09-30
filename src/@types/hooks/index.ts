export interface HookTypeParam<T, P = any> {
  service: (param: P) => Promise<T>;
  params: P;
  effects: Array<any>;
  onSuccess?: (param: T) => void;
  delayDuration?: number;
};

export interface ReturnHookType<T> {
  loading: boolean;
  loaded: boolean;
  response: T;
  error: any;
};