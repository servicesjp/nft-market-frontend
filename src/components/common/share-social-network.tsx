import { Link } from "@chakra-ui/react";
import Facebook from "@/assets/home/facebook.svg";
import Twitter from "@/assets/home/twitter.svg";
import Linkedin from "@/assets/home/linkedin.svg";

interface TypeNetwork {
  shareRoute: string;
  title: string;
}
export default function ShareSocialNetworks({ shareRoute, title }: TypeNetwork) {
  return (
    <>
      <Link
        isExternal
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareRoute}`}
      >
        <Facebook />
      </Link>
      <Link isExternal
        href={`https://www.linkedin.com/shareArticle?url=${shareRoute}&title=${title}&source=${shareRoute}`}
      >
        <Linkedin />
      </Link>
      <Link isExternal href={`https://x.com/share?url=${shareRoute}`}>
        <Twitter />
      </Link>
    </>
  );
}
