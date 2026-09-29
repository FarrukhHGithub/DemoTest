import React from "react";
import { Dropdown } from "antd";

export function MenuSelectss({ children, datas, item: data }) {
  const items = datas.map((item, index) => ({
    key: index,
    label: (
      <span className="flex items-center gap-3">
        {item.icon && <item.icon className="text-subMain text-lg" />}
        <span>{item.title}</span>
      </span>
    ),
    onClick: () => item.onClick(data),
  }));

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
      <span className="cursor-pointer inline-block">{children}</span>
    </Dropdown>
  );
}
