export const useSetSlide = (slides: Array<string>) => {
  const firstSlide = [slides[slides.length - 1]];
  const lastSlide = [slides[0]];

  return [...firstSlide, ...slides, ...lastSlide];
};
