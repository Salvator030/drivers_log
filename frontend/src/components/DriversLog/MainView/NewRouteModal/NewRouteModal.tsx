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

export function NewRouteModal() {
  const {
    isOpen,
    startAddress,
    endAdress,
    distance,
    field,
    setIsOpen,
    setDistance,
    close,
    handleOkBtn,
    back,
  } = useNewRouteModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      startAddress: state.startAdress,
      endAdress: state.endAdress,
      distance: state.distance,
      field: state.field,
      setIsOpen: state.setIsOpen,
      setDistance: state.setDistance,
      close: state.close,
      handleOkBtn: state.handleOkBtn,
      back: state.back,
    }))
  );

  const { handleNewRoute } = useApi();

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
      size="lg"
      centered
    >
      <Group>
        {(!endAdress || !startAddress) && <AddressTable />}
        {endAdress && !distance && (
          <>
            <TextInput label="entfenung" {...field.getInputProps()} />
            <Button onClick={handleOkBtn}>Ok</Button>
          </>
        )}

        {distance && <Button onClick={handleSaveBtn}>Save</Button>}
        <NewRouteTimeline />
      </Group>
      <div className={classes.backBtnDiv}>
        {startAddress && <Button onClick={back}>zurück</Button>}
      </div>
    </Modal>
  );
}
