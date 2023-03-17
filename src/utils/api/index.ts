export const getInitialGlobalData = async () => {
  console.log('getInitialGlobalData');
  return new Promise<{data: number}>(resolve =>
    setTimeout(() => resolve({data: 100}), 500),
  );
};
