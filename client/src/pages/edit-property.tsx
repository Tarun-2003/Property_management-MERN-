import { useState, useEffect } from "react";
import { useGetIdentity, useOne } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import type { FieldValues } from "react-hook-form";

import Form from "../components/common/Form";
import type { IUser } from "../interfaces/common";

const EditProperty = () => {
  const { data: user } = useGetIdentity<IUser>();
  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });

  const {
    refineCore: { onFinish, formLoading, queryResult },
    register,
    handleSubmit,
    reset,
  } = useForm();

  // ✅ Load existing property data for editing
  useEffect(() => {
    if (queryResult?.data?.data) {
      reset(queryResult.data.data); // prefill form with property values
      setPropertyImage({
        name: queryResult.data.data.title || "",
        url: queryResult.data.data.photo || "",
      });
    }
  }, [queryResult, reset]);

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
    if (!propertyImage.url) return alert("Please upload an image");

    const payload = {
      ...data,
      photo: propertyImage.url,
      email: user?.email,
    };

    await onFinish(payload);
  };

  return (
    <Form
      type="Edit"
      register={register}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinish={onFinishHandler}   // ✅ only pass this
      propertyImage={propertyImage}
    />
  );
};

export default EditProperty;
