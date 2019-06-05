function rand(min: number, max?: number): number {
  return Math.floor(randf(min, max));
}

function randf(min: number, max?: number): number {
  if (!max) {
    max = min || 1;
    min = 0;
  }
  return Math.random() * (max - min) + min;
}

function randOneIn(max: number = 2): boolean {
  return rand(0, max) === 0;
}

function randOneFrom(items: [any]): any {
  return items[rand(items.length)];
}

export {
  rand,
  randf,
  randOneIn,
  randOneFrom
};
