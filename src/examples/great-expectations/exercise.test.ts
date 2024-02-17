import { createPerson, Person } from '$lib/person';
import { KanbanBoard } from '$lib/kanban-board';

/**
 * toBe: https://vitest.dev/api/expect.html#tobe
 * toBeCloseTo: https://vitest.dev/api/expect.html#tobecloseto
 * toBeInstanceOf: https://vitest.dev/api/expect.html#tobeinstanceof
 * toBeUndefined: https://vitest.dev/api/expect.html#tobeundefined
 * toContain: https://vitest.dev/api/expect.html#tocontain
 * toThrow: https://vitest.dev/api/expect.html#tothrow
 * toThrowError: https://vitest.dev/api/expect.html#tothrowerror
 */

describe('createPerson', () => {
  test('should pass if the two numbers would add up correctly in a language other than JavaScript', () => {
    expect(0.2 + 0.1).toBeCloseTo(0.3);
  });

  test('should create an instance of a person', () => {
    const person = createPerson('Ada Lovelace');
    expect(person).toBeInstanceOf(Person);
  });
});

describe('Kanban Board', () => {
  it('should include "Backlog" in board.statuses', () => {
    const board = new KanbanBoard('Things to Do');
    expect(board.statuses).toContain('Backlog');
  });

  test('should *not* include "Bogus" in board.statuses', () => {
    const board = new KanbanBoard('Things to Do');
    expect(board.statuses).not.toContain('Bogus');
  });

  it('should include an added status in board.statuses using #addStatus', () => {
    const board = new KanbanBoard('Things to Do');
    const status = 'Greeting';
    board.addStatus(status);
    expect(board.statuses).toContain(status);
  });

  it('should remove a status using #removeStatus', async () => {
    const board = new KanbanBoard('Things to Do');
    const status = board.statuses[0];
    const returnValue = board.removeStatus(status);

    expect(board.statuses).not.toContain(status);
    expect(returnValue).resolves.toBe(4);
  });
});

describe('Person', () => {
  it('will create a person with a first name', () => {
    const person = new Person('Madonna');
    expect(person.firstName).toBe('Madonna');
  });

  it('will create a person with a first and last name', () => {
    const person = new Person('Madonna Cicone');
    expect(person.firstName).toBe('Madonna');
    expect(person.lastName).toBe('Cicone');
  });
  it('will create a person with a first, middle, and last name', () => {
    const person = new Person('Madonna Louise Cicone');
    expect(person.firstName).toBe('Madonna');
    expect(person.middleName).toBe('Louise');
    expect(person.lastName).toBe('Cicone');
  });

  it('will throw if you provide an empty string', () => {
    const fn = () => {
      new Person('');
    };
    expect(fn).toThrowError();
  });
  it('will throw a specific error message if you provide an empty string', () => {
    const errorMessage = 'fullName cannot be an empty string';
    const fn = () => {
      new Person('');
    };
    expect(fn).toThrowError(errorMessage);
  });
  it('will add a friend', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');
    john.addFriend(paul);
    expect(john.friends).toContain(paul);
  });
  it('will mutually add a friend', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');
    john.addFriend(paul);
    expect(paul.friends).toContain(john);
  });
  it('will remove a friend', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');
    john.addFriend(paul);
    john.removeFriend(paul);
    expect(john.friends).not.toContain(paul);
  });
  it('will mutually remove friends', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');
    john.addFriend(paul);
    john.removeFriend(paul);
    expect(john.friends).not.toContain(paul);
    expect(paul.friends).not.toContain(john);
  });
});

const explode = () => {
  throw new Error('Something went terribly wrong');
};

describe('explode', () => {
  it('should throw an error', () => {
    expect(explode).toThrowError();
  });

  it('should throw a specific error containing "terribly wrong"', () => {
    expect(explode).toThrowError('terribly wrong');
  });
});
