import { find } from 'lodash';
import { useState } from 'react';

export type DropdownProps = {
  toggle?: boolean;
  pic?: boolean;
  classNames?: string;
  items: ItemList[];
  category: string;
  onChange?: (param: ItemList) => void;
};

export interface ItemList {
  id: string;
  name: string;
}

function DropdownComponent(props: DropdownProps) {
  const { toggle, classNames, pic, items, category, onChange } = props;
  const [selectedId, setSelectedId] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const onClickExpanded = (item: ItemList) => {
    setSelectedId(item.id);
    setOpen(false);
    if (onChange) {
      onChange(item);
    }
  };

  const selectedLabel = () => {
    if (selectedId) {
      return find(items, { id: selectedId })?.name ?? category;
    }
    return category;
  };
  const toggleClass = !toggle ? 'block' : 'hidden';

  return (
    <section>
      <div
        className={`h-full flex items-center cursor-pointer justify-between border rounded-md relative ${classNames} ${toggleClass}`}
        onClick={() => setOpen(!open)}
      >
        <div className={`flex items-center space-x-5 ${pic ? '' : 'm-2'}`}>
          {pic && (
            <img
              src="/assets/icons/apple.svg"
              className="bg-black p-2.5 rounded-l-md"
              alt=""
            />
          )}
          <h2 className="text-sm">{selectedLabel()}</h2>
        </div>
        <img src="/assets/icons/caret-down-fill.svg" className="pr-2" alt="" />
        {open && items.length > 0 && (
          <div className="border rounded-md absolute top-10 z-20 bg-white w-full">
            {items.map((item) => (
              <div
                key={item.id}
                className="hover:bg-slate-100 p-2"
                onClick={() => onClickExpanded(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default DropdownComponent;
