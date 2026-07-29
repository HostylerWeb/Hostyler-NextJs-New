import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const LOGO_ASPECT = 2172 / 724;

type SiteLogoMarkProps = {
  className?: string;
  height?: number;
  priority?: boolean;
  src?: string;
  aspect?: number;
};

export function SiteLogoMark({
  className,
  height = 32,
  priority = false,
  src = "/logo.png",
  aspect = LOGO_ASPECT,
}: SiteLogoMarkProps) {
  const width = Math.round(height * aspect);

  return (
    <Image
      src={src}
      alt={site.name}
      width={width}
      height={height}
      priority={priority}
      className={cn("w-auto shrink-0", className)}
      style={{ height, width: "auto" }}
    />
  );
}

type SiteLogoProps = SiteLogoMarkProps & {
  href?: string;
};

export function SiteLogo({
  className,
  height = 32,
  priority = false,
  href = "/",
  src,
  aspect,
}: SiteLogoProps) {
  return (
    <Link
      href={href}
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <SiteLogoMark
        height={height}
        priority={priority}
        src={src}
        aspect={aspect}
      />
    </Link>
  );
}
