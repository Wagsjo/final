import { atom } from "recoil";
import {Hamster} from './HamsterModel'

export const hamsterObject = atom<Hamster[]>({
  key: 'hamsterAtom',
  default: []
})
