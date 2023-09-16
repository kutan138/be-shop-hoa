type TreeItem<T> = T & { children: T[] };

export const buildTree = <T>({
  parentValue = null,
  data,
  parentKey,
  idKey,
}: {
  parentValue?: any;
  data: T[];
  parentKey: keyof T;
  idKey: keyof T;
}): TreeItem<T>[] => {
  const parentList: TreeItem<T>[] = data
    .map((data) => {
      return { ...data, children: [] };
    })
    .filter((data) => data[parentKey] === parentValue);

  parentList.forEach((node) => {
    const child = buildTree({
      parentValue: node[idKey],
      data,
      parentKey,
      idKey,
    });
    if (child.length) {
      node.children = child;
    }
  });

  return parentList;
};
