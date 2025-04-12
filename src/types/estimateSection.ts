import { Section } from "./app"

export interface EstimateSectionProps {
    section: Section
    onItemUpdate: (sectionId: string, itemId: string, field: "quantity" | "unit_cost", value: string) => void
  }