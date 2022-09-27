import { useCallback, useState } from "react";

type onChangeType = (e: React.ChangeEvent<HTMLInputElement>) => void;

export const useUploadImg = (initialValue: string | undefined) => {
  const [imgBase64, setImgBase64] = useState(initialValue);
  const imagestate = useState<File | null>();
  const setImgFile = imagestate[1];

  const handleChangeFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          setImgBase64(base64.toString());
        }
      };
      if (event.target.files !== null) {
        if (event.target.files[0]) {
          reader.readAsDataURL(event.target.files[0]);
          setImgFile(event.target.files[0]);
        }
      }
    },
    [],
  );

  return [imgBase64, handleChangeFile] as [string, onChangeType];
};
