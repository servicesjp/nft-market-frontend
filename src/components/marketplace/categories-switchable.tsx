import Switchable from "@/components/swichable";
import SwitchableIndicator from "@/components/swichable/switchable-indicator";
import SwitchableItem from "@/components/swichable/switchable-item";
import { __ } from "@/helpers/common";
import { Category } from "@/types/nft/category";
import { capitalizeFirstLetter } from "@/utils";


export function CategoriesSwitchable({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: Category[];
  selectedCategory: number;
  setSelectedCategory: Function;
}) {
  const SwitchableItemStyle = {
    w: "max-content",
    py: { base: "14px", md: "12px" },
    px: { base: "24px" },
    h: "auto",
    fontSize: "16px",
    color: "primary.200",
    bg: "#F8F9FC",
  };
  return (
    <Switchable
      selected={selectedCategory}
      onChange={(val: any) => setSelectedCategory(val)}
      bg="transparent"
      color="dark.100"
      itemStyle={SwitchableItemStyle}
    >
      <SwitchableIndicator
        bg="#E6E6E6"
        color="#231C35"
        h={"100%"}
        fontWeight="500"
        borderRadius="full"
        boxShadow="sm"
      />
      {categories.map((category: Category, i: number) => (
        <SwitchableItem
          value={category.id + "-" + i.toString()}
          key={"category-" + category.id}
        >
          {capitalizeFirstLetter(__(category.translateKey))}
        </SwitchableItem>
      ))}
    </Switchable>
  );
}
  
  