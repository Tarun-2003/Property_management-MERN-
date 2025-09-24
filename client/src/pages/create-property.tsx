import { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import type { FieldValues } from "react-hook-form";

import Form from "../components/common/Form";
import type { IUser } from "../interfaces/common";

const CreateProperty = () => {
  const { data: user } = useGetIdentity<IUser>();

  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPropertyImage({ name: file?.name, url: result }),
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    console.log("🔍 user from useGetIdentity:", user);

    if (!propertyImage.name) return alert("Please select an image");

    if (!user || !user._id) {
      alert("User not found, please log in again");
      return;
    }

    const payload = {
      ...data,
      photo: propertyImage.url,
      email: user.email,
      creator: user._id, // ✅ pass MongoDB user id
    };

    console.log("Submitting property:", payload);

    await onFinish(payload);
  };

  return (
    <Form
      type="Create"
      register={register}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinish={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};

export default CreateProperty;
