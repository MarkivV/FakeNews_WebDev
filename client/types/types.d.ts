type Lists = {
    title: string,
    value: number | undefined
}

interface Looses {
    looses: RusStats | undefined
}

export type RusStats = {
    personnel_units: number
    tanks: number,
    armoured_fighting_vehicles: number,
    artillery_systems: number,
    mlrs: number,
    aa_warfare_systems: number,
    planes: number,
    helicopters: number,
    vehicles_fuel_tanks: number,
    warships_cutters: number,
    cruise_missiles: number,
    uav_systems: number,
    special_military_equip: number,
    atgm_srbm_systems: number
}

export type Layout = {
    children: any
}

export type News = {
    _id: string,
    url?: string,
    title: string,
    description: string,
    creator: string,
    tags: string[],
    image: string,
    published: boolean,
    category: string,
    createdAt?: string,
    updatedAt?: string
}

export interface typeNews {
    items: News[],
    status?: string
}