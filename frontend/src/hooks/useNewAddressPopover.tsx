import {
  useForm,
  hasLength,
  isNotEmpty,
  UseFormReturnType,
} from "@mantine/form";
import { useState } from "react";
import { Address } from "../types";
import { useApi } from "./useApi";

interface NewAddressProps {
  name: string;
  streetName: string;
  houseNumber: string;
  plz: string;
  place: string;
  info: string;
}

export const useNewAddressPopover = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { handleNewAddress } = useApi();

  const form: UseFormReturnType<NewAddressProps> = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      streetName: "",
      houseNumber: "",
      plz: "",
      place: "",
      info: "",
    },

    validate: {
      name: hasLength({ min: 5 }, "min. 5 Zeichen"),
      streetName: isNotEmpty(),
      houseNumber: isNotEmpty(),
      plz: (value: string) => (/^\d{5}$/.test(value) ? null : "5 Ziffern"),
      place: isNotEmpty(),
      info: hasLength({ max: 255 }, "max. 255 Zeichen"),
    },
  });

  const handlePopover = () => {
    if (isOpen){
      form.reset();
    }
    setIsOpen(!isOpen);
  };

  

  const handleSubmit = (values: NewAddressProps) => {
    const addressPost: Address = {
      addressId: null,
      name: values.name,
      street: values.streetName,
      existingStreetsId: null,
      existingPlzId: null,
      existingPlaceId: null,
      houseNumber: values.houseNumber,
      plz: values.plz,
      place: values.place,
      info: values.info,
    };
    handleNewAddress(addressPost);
    form.reset();
    setIsOpen(false);
  };


  return { form, isOpen, handlePopover, handleSubmit };
};
