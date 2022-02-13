import { atomWithStorage } from 'jotai/utils';


export const themeAtom = atomWithStorage(
    'theme:type',
        matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
);
