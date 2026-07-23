import Link from "next/link";
import { Compass } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="RelocateFlow home">
      <span className="brand-mark"><Compass size={19} strokeWidth={2.5} /></span>
      {!compact && <span>Relocate<span>Flow</span></span>}
    </Link>
  );
}
