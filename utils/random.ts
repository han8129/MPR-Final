export function getRandomInt({min, max}: {min: number, max: number}): number {
	  return Math.floor(Math.random() * ( 1 + max - min)) + min;
}

export function getRandomElement(list: any[]): any {
	  const randomIdx = getRandomInt({min: 0, max: list.length -1});
	  return list[randomIdx];
}
