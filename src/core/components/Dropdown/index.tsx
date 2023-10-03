/* eslint-disable react-hooks/exhaustive-deps */
import { find } from 'lodash';
import { useEffect, useRef, useState } from 'react';

export type DropdownProps = {
  toggle?: boolean;
  pic?: boolean;
  classNames?: string;
  items: ItemList[];
  category: string;
  value?: string | null;
  onChange?: (param: ItemList) => void;
};

export interface ItemList {
  id: string;
  name: string;
}

function DropdownComponent(props: DropdownProps) {
  const {
    toggle,
    classNames,
    pic,
    items,
    category,
    onChange,
    value = "",
  } = props;
  const [selectedId, setSelectedId] = useState<string>("");
  const [expand, setExpand] = useState<boolean>(false);
  const ref = useRef<any>(null);

  const onClickExpanded = (item: ItemList) => {
    setSelectedId(item.id);
    setExpand(false);
    if (onChange) {
      onChange(item);
    }
  };

  useEffect(() => {
    if (value && !selectedId) {
      setSelectedId(value);
    }
  }, [value]);

  useEffect(() => {
    document.addEventListener("click", onClickOutside);
    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, [ref]);

  const onClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setExpand(false);
    }
  };

  const selectedLabel = () => {
    if (selectedId) {
      return find(items, { id: selectedId })?.name ?? category;
    }
    return category;
  };
  const toggleClass = !toggle ? "block" : "hidden";

  return (
    <section>
      <div
        className={`h-full flex items-center cursor-pointer justify-between border rounded-md relative ${classNames} ${toggleClass}`}
        onClick={() => setExpand(!expand)}
        ref={ref}
      >
        <div className={`flex items-center space-x-5 ${pic ? "" : "m-2"}`}>
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
        {expand && items.length > 0 && (
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
