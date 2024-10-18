import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BrazilianState } from "@/assets/states";

export interface ComboBoxType {
  list: BrazilianState[];
  placeholderValue: string;
  getValue: (selectedValue: string) => void;
  value?: string;
}

export function StatesCombobox({
  placeholderValue,
  list,
  getValue,
  value,
}: ComboBoxType) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setValue] = React.useState<string>("");

  getValue(selectedValue);

  React.useEffect(() => {
    if (value) {
      setValue(value);
    }
  }, []);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedValue ? selectedValue : placeholderValue}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 z-50">
        <Command>
          <CommandInput placeholder="Pesquisar" />
          <CommandList>
            <CommandEmpty>No list found.</CommandEmpty>
            <CommandGroup>
              {list.map((item) => (
                <CommandItem
                  key={item?.sigla}
                  value={item?.nome}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      item?.nome === selectedValue ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item?.nome}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
