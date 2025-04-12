interface Item {
    item_id: string
    subject: string
    quantity: string
    unit: string
    unit_cost: string
    total: string
    item_type_display_name: string
    description: string
    cost_code_name: string
}

export interface Section {
    section_id: string
    section_name: string
    items: Item[]
    section_total: string
}

export interface EstimateData {
    data: {
        total: string
        sections: Section[]
    }
}