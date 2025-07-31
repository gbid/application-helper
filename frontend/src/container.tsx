import { ReactNode } from "react";
import { useDeviceType } from "./use-device-type";

export type ContainerProps = {
  children: ReactNode;
};

export function CenteredMain({ children }: ContainerProps) {
  const isMobile: boolean = useDeviceType();

  const style = {
    maxWidth: "768px",
    paddingLeft: isMobile ? "8px" : undefined,
    paddingRight: isMobile ? "8px" : undefined,
  };
  return (
    <main className="container-fluid position-relative">
      <div className="row h-100 justify-content-center">
        <div className="col py-4 align-self-center" style={style}>
          {children}
        </div>
      </div>
    </main>
  );
}

export function BorderedDiv({ children }: ContainerProps) {
  return (
    <div className="border rounded p-5 shadow" style={{ minHeight: "400px" }}>
      {children}
    </div>
  );
}
