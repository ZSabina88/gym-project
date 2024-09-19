interface ClientTargets {
  id: number;
  value: string;
  target: string;
}

interface ClientActivity {
  id: number;
  value: string;
  activity: string;
  target?: string;
}

export const clientTargets: ClientTargets[] = [
  {
    id: 1,
    value: "lose_weight",
    target: "Lose weight",
  },
  {
    id: 2,
    value: "gain_weight",
    target: "Gein weight",
  },
  {
    id: 3,
    value: "improve_flexibility",
    target: "Improve flexibility",
  },
  {
    id: 4,
    value: "general_fitness",
    target: "General fitness",
  },
  {
    id: 5,
    value: "gain_weight",
    target: "Build Muscle",
  },
  {
    id: 6,
    value: "gain_weight",
    target: "Rehabilitation/Recovery",
  },
];

export const clientActivities: ClientActivity[] = [
  {
    id: 1,
    value: "yoga",
    activity: "Yoga",
  },
  {
    id: 2,
    value: "climbing",
    activity: "Climbing",
  },
  {
    id: 3,
    value: "strength_training",
    activity: "Strength training",
  },
  {
    id: 4,
    value: "cross-fit",
    activity: "Cross-fit",
  },
  {
    id: 5,
    value: "cardio_training",
    activity: "Cardio Training",
  },
  {
    id: 6,
    value: "rehabilitation",
    activity: "Rehabilitation",
  },
];
