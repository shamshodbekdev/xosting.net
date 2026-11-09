import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Til prefiksini avtomatik qo'shadigan Link va yordamchi hooklar
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
