import { styled } from "styled-components";
import { color } from "../../utils/color";
import { useEffect, useState } from "react";
import { BsImageFill } from "react-icons/bs";

interface Props {
  setValue: Function;
  id: string;
  defaultImage: string | null;
}

const InputImage = ({ setValue, id, defaultImage }: Props) => {
  const [image, setImage] = useState<File | null>();

  useEffect(() => {
    setValue();
  }, [image]);
  return (
    <Container>
      <Label htmlFor={id}>
        {image ? (
          <LabelImg src={image.name} />
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
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;

  & input {
    display: none;
  }
`;

const Label = styled.label`
  padding: 1rem;
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
  object-fit: contain;
  object-position: center;
`;

export default InputImage;
