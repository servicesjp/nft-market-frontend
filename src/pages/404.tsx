import { PageTitle } from "@/components/page-title";
import { ParagraphWithLeading } from "@/components/paragraph-with-leading";
import { __ } from "@/helpers/common";
import { MainLayout } from "@/layouts/main-layout";
import WrappedContent from "@/layouts/wrapped-content";

import { Box } from "@chakra-ui/react";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>{__("not_found_met")}</title>
        <meta name="description" content="This page does not exist | Meteor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <MainLayout>
        <WrappedContent>
          <Box flex="1" maxWidth={{ base: "100%", md: "38rem" }} minH={"54vh"}>
            <PageTitle highlight="Page">{__("s_page_not_exist")}</PageTitle>
            <ParagraphWithLeading
              leading="s_we_are_sorry"
              text="p_page_not_exist"
            />
          </Box>
        </WrappedContent>
      </MainLayout>
    </>
  );
}
