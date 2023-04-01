export const ROOT = '/';
export const SEP = '/';

export function parsePath(path: string): string[] {
  const parts = path.split(SEP);
  return parts.map((part, index) => {
    if (index === 0 && part === '') {
      return ROOT;
    } else {
      return part;
    }
  });
}

export function joinPath(parts: string[]): string {
  if (parts.length === 0) {
    return '';
  }
  if (parts[0] === ROOT) {
    parts[0] = '';
  }
  return parts.join(SEP);
}

export function normalizePath(path: string): string {
  const parts = parsePath(path);
  const newParts: string[] = [];

  function handleParent(part: string) {
    if (newParts.length > 1) {
      newParts.pop();
      return;
    }
    
    if (newParts.length === 1) {
      if (newParts[0] !== ROOT) {
        newParts.pop();
      }
      return;
    }

    newParts.push(part);
  }

  for (const part of parts) {
    if (part === '..') {
      handleParent(part);
    } else if (part !== '.') {
      newParts.push(part);
    }
  }
  return joinPath(newParts);
}

console.log(normalizePath('/a/b/.././../../a/b/../b/c'));

export function isAbsolute(path: string): boolean {
  return path.startsWith('/');
}

export function isRelative(path: string): boolean {
  return !isAbsolute(path);
}

export function isRoot(path: string): boolean {
  return path === '/';
}

export function basename(path: string): string {
  return parsePath(path).pop() ?? '';
}

export function dirname(path: string): string {
  return joinPath(parsePath(path).slice(0, -1));
}

export function extname(path: string): string {
  const basename = parsePath(path).pop() ?? '';
  const parts = basename.split('.');
  return parts.pop() ?? '';
}

export function relative(from: string, to: string): string {
  const fromParts = parsePath(from);
  const toParts = parsePath(to);
  let i = 0;
  while (i < fromParts.length && i < toParts.length && fromParts[i] === toParts[i]) {
    i++;
  }
  const upParts = fromParts.slice(i).map(() => '..');
  const downParts = toParts.slice(i);
  return joinPath([...upParts, ...downParts]);
}

export function isParent(parent: string, child: string): boolean {
  const parentParts = parsePath(parent);
  const childParts = parsePath(child);
  if (parentParts.length > childParts.length) {
    return false;
  }
  for (let i = 0; i < parentParts.length; i++) {
    if (parentParts[i] !== childParts[i]) {
      return false;
    }
  }
  return true;
}

export function isChild(child: string, parent: string): boolean {
  return isParent(parent, child);
}

export function isSibling(a: string, b: string): boolean {
  return isParent(dirname(a), dirname(b));
}

export function isSame(a: string, b: string): boolean {
  return normalizePath(a) === normalizePath(b);
}