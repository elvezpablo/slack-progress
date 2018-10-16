const bar = (progress: number) =>
  ['⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜']
    .map((v: string, idx: number) => (idx < progress ? '⬛' : v))
    .join('');

export { bar };
