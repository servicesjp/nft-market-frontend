import { BoxProps, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

export interface IBreadCrumbData {
  text: string,
  link: string,
  isCurrentPage?: boolean
}

interface BreadcrumbProps extends BoxProps {
  items: IBreadCrumbData[]
}

export default function MEbreadcrumb( {items, ...props }:BreadcrumbProps) {
  const router = useRouter()
  // const breadcrumb = [{text: "Meteor Home"}, {text: "NFT Home"}, {text: "Experience", isCurrentPage: true}];

  const _separatorBreadcum = () => <Image src="/images/icons/arrow-down.svg" alt="Rigth Arrow" width="14px"/>

  return (
    <Breadcrumb separator={ _separatorBreadcum() } padding="0 0 20px" {...props}>
      { items.map((d, i) => (
          <BreadcrumbItem isCurrentPage={d.isCurrentPage} key={"breadcrumItem-" + i}>

            <BreadcrumbLink 
              // href={d.link}
              onClick={() => router.push(d.link)}
            >
                {d.text} 
            </BreadcrumbLink>

          </BreadcrumbItem>
        ))
      };
    </Breadcrumb>
  );
}
