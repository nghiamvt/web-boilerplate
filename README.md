<p align="center"><img src="header.jpeg" alt="Web boilerplate" /></p>

## Motivation

Redux comes along with lots of boilerplace code which makes it really annoying.
So, I implemented my own approach in order to have fun with it


There are some recursions that I wrote to handle immutability of Redux Store. (/src/utils/immutable.js)
Based on this code, I only need to write a reducer for all actions (/src/store/root-reducer.js)


Here is how I use my action. Only need to point out a path, and it will automatically update at that place in store


## SET_DATA
set a value (new or existing) to a particular path provided

```
import { SET_DATA } from 'src/store/data-action';
const path = 'noteList';
export const updateNote = (id, text) => {
  return SET_DATA({
    _path: `${path}.${id}.task`,
    _value: text,
  });
};
```


## REMOVE_DATA
Delete an item of an array or a field of an object (The recursion will detect itself)

```
import { REMOVE_DATA } from 'src/store/data-action';
const path = 'noteList';
export const deleteNote = (ids) => {
  return REMOVE_DATA({
    _path: path,
    _value: ids,
  });
};
```

## REMOVE_DATA
Insert, Update data into an existing path. If it is an array, it will use concat. If it is an object, it will use Object.assign()

```
import { MERGE_DATA } from 'src/store/data-action';
const path = 'noteList';
export const addNote = (text) => {
  const id = Math.ceil(new Date());
  return MERGE_DATA({
    _path: `${path}.${id}`,
    _value: {
      id,
      task: text,
    },
  });
};
```


There are also a lots of interesting features that I implemented in this boilerplace. Feel free to check it out.
