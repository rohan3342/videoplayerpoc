const LayoutType = {
  GRID: 'Grid',
  PINNED: 'Pinned',
  INSTRUCTOR: 'Instructor',
};

const UserData = [
  'Video Player',
  'Rohan',
  'Ritika',
  'Shashank',
  'Raj',
  'Rahul',
  'Jasmin',
  'Ishita',
  'Sapna',
  'Yash',
  'Hanit',
  'Alice',
  'Oz',
  'Shane',
  'Digi',
  'Rajat',
  'Dhruv',
  'Kartikey',
];

function splitArrayIntoChunks(list, flag, isMobile = false) {
  let index = 0;
  let chunkSize = flag ? 9 : 12;

  const chunks = [];

  while (index < list.length) {
    chunks.push(list.slice(index, index + chunkSize));
    index += chunkSize;
  }
  return chunks;
}

function splitArrayForGrid(array, isLeaderBoardOpen) {
  const newArray = [];
  if (!isLeaderBoardOpen) {
    if (array.length < 3) {
      newArray.push(array);
    } else if (array.length === 3) {
      newArray.push(array.slice(0, 2));
      newArray.push(array.slice(2));
    } else if (array.length === 4) {
      newArray.push(array.slice(0, 2));
      newArray.push(array.slice(2));
    } else if (array.length === 5) {
      newArray.push(array.slice(0, 4));
      newArray.push(array.slice(4));
    } else if (array.length > 5) {
      const numArrays = Math.ceil(array.length / 4);
      for (let i = 0; i < numArrays; i++) {
        newArray.push(array.slice(i * 4, i * 4 + 4));
      }
    }
  } else {
    if (array.length < 3) {
      newArray.push(array);
    } else if (array.length === 3) {
      newArray.push(array.slice(0, 2));
      newArray.push(array.slice(2));
    } else if (array.length === 4) {
      newArray.push(array.slice(0, 2));
      newArray.push(array.slice(2));
    } else if (array.length > 4) {
      const numArrays = Math.ceil(array.length / 3);
      for (let i = 0; i < numArrays; i++) {
        newArray.push(array.slice(i * 3, i * 3 + 3));
      }
    }
  }
  return newArray;
}

export { LayoutType, UserData, splitArrayForGrid, splitArrayIntoChunks };
