import { useEffect, useState } from "react";

export const useConvertBase64 = (file) => {

  const [base64, setBase64] = useState(null)
  useEffect(() => {
    if (!file) return
    const reader = new FileReader();
    let read = reader.readAsDataURL(file);
    console.log(read);
    reader.onload = () => {
      const str = reader.result.split(',')[1];
      setBase64(str)
    }
  }, [file])


  return base64;
}