import SubMenuOption from "@/modules/menu/sub-menu-option";
import TopLevelPopupMenu from "./top-level-popup-menu";

import { useRouter } from "next/router";

export const HomeMenuLinks = [
  {
    route: "/affiliate/affiliate-program",
    text: "Affiliate Program",
    subtitle: "Convert your influence into affluence",
  },
  {
    route: '/fees',
    text: 'Transaction fee information',
    subtitle: 'Learn more about our fees',
  },
  {
    route: '/blogs',
    text: 'Blogs',
    subtitle: 'Stay on top of the latest crypto trends',
  }
];

export default function HomeMenu({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <TopLevelPopupMenu trigger={children}>
      {HomeMenuLinks.map((link, index) => (
        <SubMenuOption
          key={index}
          onClick={() => router.push(link.route)}
          text={link.text}
          subtitle={link.subtitle}
        />
      ))}
    </TopLevelPopupMenu>
  );
}
