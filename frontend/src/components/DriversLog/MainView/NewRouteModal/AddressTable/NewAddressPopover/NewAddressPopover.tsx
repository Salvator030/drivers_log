import { Popover, rem, ActionIcon, Title, Grid, TextInput, Group } from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { IconPlus, IconX, IconCheck } from "@tabler/icons-react";
import { useNewAddressPopover } from "../../../../../../hooks/useNewAddressPopover";
import classes from "./NewAddressPopover.module.css"
export function NewAddressPopover(){

     
    const {form, isOpen,handlePopover, handleSubmit} = useNewAddressPopover()
  

        return(
            <Popover position="right" opened={isOpen} closeOnClickOutside={false} width={rem(300)} >
            <Popover.Target>
              <ActionIcon onClick={() =>handlePopover()}>
                <IconPlus />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown >
              <Title size={"xl"}>Neue Adresse</Title>
              <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <Grid>
                <Grid.Col span={12}>
                  <TextInput label="Name" key={form.key('name')}  {...form.getInputProps('name')}/>
                </Grid.Col>
                <Grid.Col span={8}>
                  <TextInput label="Straßenname" key={form.key('streetName')}  {...form.getInputProps('streetName')} />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput label="Haus Nr." key={form.key('houseNumber')}  {...form.getInputProps('houseNumber')}/>
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput label="PLZ"key={form.key('plz')}  {...form.getInputProps('plz')} />
                </Grid.Col>
                <Grid.Col span={8}>
                  <TextInput label="Ort" key={form.key('place')}  {...form.getInputProps('place')}/>
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInput label="Info" key={form.key('info')} {...form.getInputProps('info')} />
                </Grid.Col>
              </Grid>
              <Group  justify="space-between" className={classes.btnGroup}>
                <ActionIcon onClick={handlePopover}>
                  <IconX />
                </ActionIcon>
                <ActionIcon  type="submit">
                  <IconCheck />
                </ActionIcon>
              </Group>
              </form>
            </Popover.Dropdown>
          </Popover>
        )
}
