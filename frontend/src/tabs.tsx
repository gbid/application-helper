import React from "react";
import { useDeviceType } from "./use-device-type";

export type TabItem<T extends string> = {
  id: T;
  title: string;
  content: React.ReactNode;
};

type TabsProps<T extends string> = {
  tabs: TabItem<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
};

export function Tabs<T extends string>({
  tabs,
  activeTab,
  onTabChange,
}: TabsProps<T>) {
  const isMobile = useDeviceType();
  const activeTabItem = tabs.find((tab) => tab.id === activeTab);

  const handleTabClick = (id: T) => {
    onTabChange(id);
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
  };

  const tabListStyle: React.CSSProperties = {
    display: "flex",
    borderBottom: "1px solid #ccc",
    position: "sticky",
    top: 0,
    backgroundColor: "white",
    overflowX: isMobile ? "auto" : "visible",
    WebkitOverflowScrolling: isMobile ? "touch" : "auto",
  };

  const baseTabStyle: React.CSSProperties = {
    padding: isMobile ? "12px 10px" : "12px 24px",
    cursor: "pointer",
    background: "none",
    border: "none",
    borderBottom: "none",
    outline: "none",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: isMobile ? "14px" : "16px",
    transition: "border-color 0.2s ease",
    flex: isMobile ? "1 0 auto" : "0 1 auto",
    minWidth: isMobile ? "80px" : undefined,
  };

  const activeTabStyle: React.CSSProperties = {
    ...baseTabStyle,
    borderBottom: "2px solid black",
    fontWeight: "bold",
  };

  const contentStyle: React.CSSProperties = {
    paddingTop: "20px",
  };

  return (
    <div style={containerStyle}>
      <div style={tabListStyle}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            style={tab.id === activeTab ? activeTabStyle : baseTabStyle}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div style={contentStyle}>{activeTabItem?.content}</div>
    </div>
  );
}
