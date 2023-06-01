import { useEffect, useState } from "react";

export default function useFilePreview(file: any) {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (file && file[0]) {
      const newUrl: any = URL.createObjectURL(file[0]);
      setImgSrc((prevImgSrc) => {
        if (newUrl !== prevImgSrc) {
          return newUrl;
        }
        return prevImgSrc;
      });
    }
  }, [file]);

  return [imgSrc, setImgSrc];
}
