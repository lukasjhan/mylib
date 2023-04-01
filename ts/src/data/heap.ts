export class Heap<T> {
  private elements: T[];
  private compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number) {
    this.elements = [];
    this.compare = compare;
  }

  private getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  private getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  private getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  private hasLeftChild(index: number): boolean {
    return this.getLeftChildIndex(index) < this.elements.length;
  }

  private hasRightChild(index: number): boolean {
    return this.getRightChildIndex(index) < this.elements.length;
  }

  private hasParent(index: number): boolean {
    return this.getParentIndex(index) >= 0;
  }

  private leftChild(index: number): T {
    return this.elements[this.getLeftChildIndex(index)];
  }

  private rightChild(index: number): T {
    return this.elements[this.getRightChildIndex(index)];
  }

  private parent(index: number): T {
    return this.elements[this.getParentIndex(index)];
  }

  private swap(index1: number, index2: number): void {
    const temp = this.elements[index1];
    this.elements[index1] = this.elements[index2];
    this.elements[index2] = temp;
  }

  private heapifyUp(): void {
    let index = this.elements.length - 1;
    while (this.hasParent(index) && this.compare(this.parent(index), this.elements[index]) > 0) {
      const parentIndex = this.getParentIndex(index);
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  private heapifyDown(): void {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (this.hasRightChild(index) && this.compare(this.rightChild(index), this.leftChild(index)) < 0) {
        smallerChildIndex = this.getRightChildIndex(index);
      }

      if (this.compare(this.elements[index], this.elements[smallerChildIndex]) < 0) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }

      index = smallerChildIndex;
    }
  }

  add(element: T): void {
    this.elements.push(element);
    this.heapifyUp();
  }

  poll(): T | undefined {
    if (this.elements.length === 0) {
      return undefined;
    }

    const minElement = this.elements[0];
    this.elements[0] = this.elements[this.elements.length - 1];
    this.elements.pop();
    this.heapifyDown();
    return minElement;
  }

  peek(): T | undefined {
    if (this.elements.length === 0) {
      return undefined;
    }

    return this.elements[0];
  }

  clear(): void {
    this.elements = [];
  }

  size(): number {
    return this.elements.length;
  }

  toArray(): T[] {
    return [...this.elements];
  }
}