import { create } from 'zustand'

export type Screen =
  | 'landing' | 'packages' | 'copies' | 'payment' | 'confirm'
  | 'camera' | 'layout' | 'printing' | 'done'
  | 'admin-login' | 'admin-dashboard' | 'admin-packages'
  | 'admin-transactions' | 'admin-printer'

export interface Photo {
  data: string
  w: number
  h: number
}

export interface Config {
  pkgId: number
  pkgName: string
  pkgType: string
  template: string
  total: number
  copies: number
  copiesInc: number
  extra: number
  amount: number
  method: string
  status: string
  txId: number | null
  sid: string
  filter: string
  email?: string
  photos?: string[]
  layoutImg?: string
}

interface State {
  screen: Screen
  photos: Photo[]
  config: Config | null
  strip: string | null

  set: (s: Screen) => void
  add: (p: Photo) => void
  remove: (i: number) => void
  clear: () => void
  cfg: (c: Config | null) => void
  patch: (p: Partial<Config>) => void
  stripUrl: (u: string | null) => void
  reset: () => void
}

export const useStore = create<State>((set, get) => ({
  screen: 'landing',
  photos: [],
  config: null,
  strip: null,

  set: (s) => set({ screen: s }),
  add: (p) => { const { photos } = get(); if (photos.length < 4) set({ photos: [...photos, p] }) },
  remove: (i) => set({ photos: get().photos.filter((_, j) => j !== i) }),
  clear: () => set({ photos: [] }),
  cfg: (c) => set({ config: c }),
  patch: (p) => { const { config } = get(); if (config) set({ config: { ...config, ...p } }) },
  stripUrl: (u) => set({ strip: u }),
  reset: () => set({ photos: [], config: null, strip: null, screen: 'landing' }),
}))
