import React, { useEffect, useState } from "react";
import "./customImageFile.css";
import { RiImageAddLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";

type Props = {
getValue: Function;
init: boolean;
};

const CustomImageFile = ({ getValue, init }: Props) => {
const [image, setImage] = useState<any>();
const [imageFile, setImageFile] = useState<File | null>();
const [isValid, setIsValid] = useState(false);

function isIdentityPhoto(imageWidth: number, imageHeight: number) {
console.log(imageWidth, imageHeight);
return (
(imageWidth === 360 && imageHeight === 463) ||
(imageWidth === 463 && imageHeight === 360)
);
}

const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
const file = (e.target.files as FileList)[0];

    setImageFile(file);

    if (!file.type.match(/image.*/)) {
      return toast.error("Le fichier téléchargé n'est pas une image.");
    }

    const img = new Image();

    img.onload = () => {
      if (!isIdentityPhoto(img.width, img.height)) {
        setIsValid(false);
        return toast.error(
          "La photo téléchargée doit être en format photo d'identité (35 mm x 45 mm)."
        );
      } else {
        setIsValid(true);
      }
    };

    img.src = URL.createObjectURL(file);

    if (file.type === "image/png" || file.type === "image/jpeg") {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.addEventListener("load", (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          setImage(e.target.result);
        }
      });
    } else {
      return toast.error("Le fichier charger doit être une image");
    }

};

const deleteImage = (e: React.SyntheticEvent) => {
e.preventDefault();
setImage(null);
setImageFile(null);
};

useEffect(() => {
if (init) {
setIsValid(false);
setImage(null);
}
}, [init]);

useEffect(() => {
getValue(imageFile);
}, [imageFile]);
return (
<div className="custom-image-file-container">
<Toaster />
<label htmlFor="custom-image">
{isValid && image ? (
<>
<span className="delete" onClick={deleteImage}>
<RxCross2 />
</span>
<img src={isValid && image} alt="" />
</>
) : (
<p>
<RiImageAddLine />
<span>Ajouter votre photo</span>
</p>
)}
</label>
<input
type="file"
id="custom-image"
style={{ display: "none" }}
onChange={addImage}
accept="image/png, image/jpeg"
/>
</div>
);
};

export default CustomImageFile;
