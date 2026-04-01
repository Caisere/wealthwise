import { type Route } from "next";
import Link from "next/link";

type EmptyAction = {
  link: string;
  label: string;
};

type EmptyComponentType = {
  icon?: React.ReactElement;
  title?: string;
  description?: string;
  action?: EmptyAction;
  variant?: "dashed" | "card";
};

export function EmptyComponent({
  icon,
  title,
  description,
  action,
  variant = "dashed",
}: EmptyComponentType) {
  const variants = {
    dashed: "bg-transparent",
    card: "border border-gray-200 bg-white",
  };

  return (
    <div
      className={`flex flex-col items-center text-center px-6 py-10 rounded-xl ${variants[variant]}`}
    >
      {icon && (
        <div className="w-11 h-11 flex items-center justify-center rounded-[10px]">
          {icon}
        </div>
      )}
      {title && (
        <p className="text-sm font-medium text-gray-50 mb-1.5">{title}</p>
      )}
      {description && (
        <p className="text-[13px] text-gray-500 leading-relaxed max-w-45 mb-4">
          {description}
        </p>
      )}
      {action && (
        <Link
          href={action.link as Route}
          className="text-[13px] px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
