export const calcScrollPosition = (direction, ref, length) => {
  const scrollPosition = ref.current.scrollLeft;
  const completeWidth = ref.current.scrollWidth - 14; //without list margin
  const itemWidth = completeWidth / length;
  let itemScrollPos = [];

  for (let i = 0; i < length; i++) itemScrollPos.push(i * itemWidth);

  // Calc scroll position
  let currentIndex = itemScrollPos.findIndex(
    itemPos => itemPos >= scrollPosition - itemWidth / 2
  );
  let nextIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;
  if (nextIndex < 0) nextIndex = 0;

  return itemScrollPos[nextIndex];
};
