import { styled } from "styled-components";
import { color } from "../../utils/color";
import { useEffect, useState } from "react";
import { BsImageFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
interface Props {
  setValue: Function;
  id: string;
  defaultImage: string | null;
}

const InputImage = ({ setValue, id, defaultImage }: Props) => {
  const [image, setImage] = useState<File | null>();
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setValue(image ? image : null);
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else if (defaultImage && !image) [setValue(null)];
    else {
      setPreviewImage(undefined);
    }
  }, [image, defaultImage]);

  return (
    <Container>
      {previewImage && (
        <LabelDelete onClick={() => setImage(null)}>
          <RxCross2 size={10} />
        </LabelDelete>
      )}

      <Label htmlFor={id}>
        {previewImage ? (
          <LabelImg src={previewImage} />
        ) : defaultImage ? (
          <LabelImg src={defaultImage} />
        ) : (
          <>
            AJOUT LOGO
            <BsImageFill size={40} />
          </>
        )}
      </Label>
      <input
        type="file"
        id={id}
        onChange={(e) => setImage(e.target.files && e.target.files[0])}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;

  & input {
    display: none;
  }
`;

const Label = styled.label`
  padding: 0.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  row-gap: 0.2rem;
  color: ${color.darkBlue};
  width: 150px;
  height: 80px;
  border: 1px solid ${color.border};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
`;

const LabelImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
`;

const LabelDelete = styled.div`
  position: absolute;
  top: 1px;
  left: 155px;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${color.red};
  color: #fff;
  cursor: pointer;
`;

export default InputImage;
