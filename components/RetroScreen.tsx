import type { ReactNode } from "react";

type RetroScreenProps = {
  children: ReactNode;
};

export function RetroScreen({ children }: RetroScreenProps) {
  return (
    <div className="retro-device">
      <div className="retro-screen">
        {children}
      </div>
    </div>
  );
}
