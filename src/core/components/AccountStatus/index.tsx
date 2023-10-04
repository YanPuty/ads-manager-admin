import classNames from 'classnames';
import { useEffect, useState } from 'react';

export type AccountStatusProps = {
  type?: "warning" | "danger" | "success";
  title?: string;
  description?: string;
};

function Alert(props: AccountStatusProps) {
  const { type = "success", description = "", title = "" } = props;
  const [closed, setClosed] = useState(false);

  const typeClass = classNames({
    "bg-green-50 text-green-800": type === "success",
    "bg-red-50 text-red-800": type === "danger",
    "bg-orange-50 text-orange-800": type === "warning",
    "opacity-0": closed,
    "opacity-100": !closed,
  });

  const getIconImage = (): string => {
    switch (type) {
      case "success":
        return "/assets/icons/exclamation-circle-gray.svg";
      case "danger":
        return "/assets/icons/exclamation-circle-red.svg";
      case "warning":
        return "/assets/icons/exclamation-circle-yellow.svg";

      default:
        return "/assets/icons/exclamation-circle-gray.svg";
    }
  };

  const getCrossImageUrl = (): string => {
    switch (type) {
      case "success":
        return "/assets/icons/cross-gray.svg";
      case "danger":
        return "/assets/icons/cross-red.svg";
      case "warning":
        return "/assets/icons/cross-orange.svg";

      default:
        return "/assets/icons/cross-gray.svg";
    }
  };

  useEffect(() => {
    return () => {
      setClosed(false);
    };
  }, []);

  return (
    <>
      {!closed && (
        <div
          className={classNames(
            "text-sm p-5 my-5 border rounded-md flex justify-between space-x-5 items-center transition-all duration-500 ease-in-out",
            typeClass,
          )}
        >
          <div className="flex flex-wrap items-start gap-3.5">
            <img src={getIconImage()} alt={getIconImage()} />
            <div>
              <h3 className="font-semibold text-base leading-none">{title}</h3>
              <p className="mt-2">{description}</p>
            </div>
          </div>
          <img
            className="cursor-pointer transition duration-500 ease-in-out transform hover:scale-110"
            src={getCrossImageUrl()}
            alt={getIconImage()}
            onClick={() => setClosed(true)}
          />
        </div>
      )}
    </>
  );
}
export default Alert;
