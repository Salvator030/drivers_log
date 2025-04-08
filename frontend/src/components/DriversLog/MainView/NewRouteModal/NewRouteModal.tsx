import {
  ActionIcon,
  Button,
  Grid,
  Group,
  Modal,
  Popover,
  rem,
  TextInput,
  Title,
} from "@mantine/core";
import { useNewRouteModalStore } from "../../../../stores/useNewRouteModalStore";
import { useShallow } from "zustand/react/shallow";
import { IconCheck, IconX, IconPlus } from "@tabler/icons-react";
import { NewAddressPopover } from "./AddressTable/NewAddressPopover/NewAddressPopover";
import { use } from "react";
import { AddressTable } from "./AddressTable/AddressTable";
import { NewRouteTimeline } from "./NewRouteTimeline/NewRouteTimeline";
import { useField, useForm } from "@mantine/form";
import classes from "./NewRouteModal.module.css";
import { useApi } from "../../../../hooks/useApi";
import { Route } from "../../../../types";
import { useTranslation } from "react-i18next";

export function NewRouteModal() {
     const { t, i18n } = useTranslation();
  const {
    isOpen,
    startAddress,
    endAdress,
    distance,
    close,
    setDistance,
    back,
  } = useNewRouteModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      startAddress: state.startAdress,
      endAdress: state.endAdress,
      distance: state.distance,
      setIsOpen: state.setIsOpen,
      setDistance: state.setDistance,
      close: state.close,

      back: state.back,
    }))
  );

  const field = useField({
    initialValue: "",
    validateOnBlur: true,
    validate: (value) =>
      /^\d{1,}([,.]\d{1,2})?$/.test(value) ? null : t('newRouteModal.validateDistance'),
  });

  const { handleNewRoute } = useApi();

  const handleOkBtn = async () => {
    const validationError = field.validate();
    if (
      !validationError.then((res) => {
        const dist = parseFloat(field.getValue().replace(",", "."));
        setDistance(dist);
      })
    ) {
    }
  };

  const handleSaveBtn = () => {
    const route: Route = {
      routeId: null,
      startAddressId: startAddress?.id ?? 0,
      endAddressId: endAdress?.id ?? 0,
      distance: distance ?? 0,
    };

    if (route.startAddressId !== 0 || route.endAddressId !== 0) {
      handleNewRoute(route);
      close();
    }
  };

  return (
    <Modal
      opened={isOpen}
      onClose={close}
      closeOnClickOutside={false}
      size="xl"
      centered
    >
      <Grid>
        <Grid.Col span={8}>
          {(!endAdress || !startAddress) && <AddressTable />}
          {endAdress && !distance && (
            <>
              <TextInput label={ t('newRouteModal.lable')} {...field.getInputProps()} />
              <Button onClick={handleOkBtn}>Ok</Button>
            </>
          )}

          {distance && <Button onClick={handleSaveBtn}>{ t('newRouteModal.lable.saveBtn')}</Button>}
        </Grid.Col>
        <Grid.Col span={4}>
          <NewRouteTimeline />
        </Grid.Col>
      </Grid>
      <div className={classes.backBtnDiv}>
        {startAddress && <Button onClick={back}>{ t('newRouteModal.backBtn')}</Button>}
      </div>
    </Modal>
  );
}
