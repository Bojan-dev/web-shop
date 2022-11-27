import { useEffect } from 'react';

const useSetDocTitle = (title: string): void => {
  useEffect(() => {
    document.title = `TC Shop - ${title}`;
  }, []);
};

export default useSetDocTitle;
