export const GRAPE_VARIETY = {
    MALBEC: {
        MONTHS_OF_GROWTH: ["September", "October", "November", "December", "January", "February", "March"],
        EFFECTIVE_INFESTATION_PER_CLUSTER: 0.3,
        DAMAGE_PER_GENERATION: {
            FIRST_GENERATION: 0.01,
            SECOND_GENERATION: 0.05,
            THIRD_GENERATION: 0.1,
            FOURTH_GENERATION: 0.02,
        }
    },
    TORRONTES: {
        MONTHS_OF_GROWTH: ["September", "October", "November", "December", "January", "February"],
        EFFECTIVE_INFESTATION_PER_CLUSTER: 0.18,
        DAMAGE_PER_GENERATION: {
            FIRST_GENERATION: 0.01,
            SECOND_GENERATION: 0.04,
            THIRD_GENERATION: 0.08,
            FOURTH_GENERATION: 0.015,
        }
    },
}

export const MONTHS = {
    SEPTEMBER: {
        CLIMATE: {
            AVERAGE_TEMPERATURE: 16.4,
            DESVIATION: 8.6,
        },
        DAYS: 30
    },
    OCTOBER: {
        CLIMATE: {
            AVERAGE_TEMPERATURE: 20.6,
            DESVIATION: 8.1,
        },
        DAYS: 31
    },
    NOVEMBER: {
        CLIMATE: {
            AVERAGE_TEMPERATURE: 23.9,
            DESVIATION: 7.8,
        },
        DAYS: 30
    },
    DECEMBER: {
        CLIMATE: {
            AVERAGE_TEMPERATURE: 26,
            DESVIATION: 7.7,
        },
        DAYS: 31
    },
    JANUARY: {
        CLIMATE: {
            AVERAGE_TEMPERATURE: 26.4,
            DESVIATION: 7.3,
        },
        DAYS: 31
    },
    FEBRUARY: {
        CLIMATE: {
            AVERAGE_TEMPERATURE: 24.8,
            DESVIATION: 7.1,
        },
        DAYS: 28
    },
    MARCH: {
        CLIMATE: {
            AVERAGE_TEMPERATURE: 23,
            DESVIATION: 6.8,
        },
        DAYS: 31
    },
}

export const CONTROL_METHODS = {
    PHEROMONE_TRAPS: {
        EFFECTIVENESS_MIN: 0.05,
        EFFECTIVENESS_MAX: 0.25,
    },
    MATING_DISRUPTION: {
        EFFECTIVENESS_MIN: 0.8,
        EFFECTIVENESS_MAX: 1,
    },
    INSECTICIDES: {
        EFFECTIVENESS_MIN: 0.8,
        EFFECTIVENESS_MAX: 0.95,
    },
    STERILE_INSECT_TECHNIQUE: {
        EFFECTIVENESS_MIN: 0.5,
        EFFECTIVENESS_MAX: 0.9,
    },
}

export const QUANTITY_OF_ADULTS_PER_HA_DEFAULT = 0.2

export const ADULT_FEMALE_FERTILITY = {
    AVERAGE: 134.84,
    DESVIATION: 15.68,
}

export const DEGREE_DAYS_ACCUMULATED_PER_GENERATION = {
     AVERAGE: 435,
     DESVIATION: 2.3,
     UMBRAL: 15
}

export const MORTALITY_RATE_LARVA = {
    MAX_PERCENTAGE: 0.17,
    MIN_PERCENTAGE: 0.05
}

export const AVERAGE_YIELD_KG_OF_VID_PER_HA = 13557

