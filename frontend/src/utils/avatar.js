export function getAvatar(seed) {
  const id = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return `https://i.pravatar.cc/150?img=${id % 70}`;
}
