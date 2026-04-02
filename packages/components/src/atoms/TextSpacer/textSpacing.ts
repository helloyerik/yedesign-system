export type TextSpacingMode = "default" | "dense";
export type TextSpacingRole = "Display" | "Header" | "Subheader" | "Body" | "Caption";
export type TextSpacingVariant =
  | "Display 4"
  | "Display 3"
  | "Display 2"
  | "Display 1"
  | "Header 2"
  | "Header 1"
  | "Subheader 3"
  | "Subheader 2"
  | "Subheader 1"
  | "Body 3"
  | "Body 2"
  | "Body 1"
  | "Body 1 Short"
  | "Caption 2"
  | "Caption 1";

const variantRoleMap: Record<TextSpacingVariant, TextSpacingRole> = {
  "Display 4": "Display",
  "Display 3": "Display",
  "Display 2": "Display",
  "Display 1": "Display",
  "Header 2": "Header",
  "Header 1": "Header",
  "Subheader 3": "Subheader",
  "Subheader 2": "Subheader",
  "Subheader 1": "Subheader",
  "Body 3": "Body",
  "Body 2": "Body",
  "Body 1": "Body",
  "Body 1 Short": "Body",
  "Caption 2": "Caption",
  "Caption 1": "Caption",
};

const spacingMatrix: Record<TextSpacingMode, Record<TextSpacingRole, Record<TextSpacingRole, string>>> = {
  default: {
    Display: {
      Display: "--mi-spacing-12",
      Header: "--mi-spacing-12",
      Subheader: "--mi-spacing-12",
      Body: "--mi-spacing-12",
      Caption: "--mi-spacing-8",
    },
    Header: {
      Display: "--mi-spacing-12",
      Header: "--mi-spacing-12",
      Subheader: "--mi-spacing-8",
      Body: "--mi-spacing-12",
      Caption: "--mi-spacing-8",
    },
    Subheader: {
      Display: "--mi-spacing-8",
      Header: "--mi-spacing-8",
      Subheader: "--mi-spacing-8",
      Body: "--mi-spacing-8",
      Caption: "--mi-spacing-4",
    },
    Body: {
      Display: "--mi-spacing-12",
      Header: "--mi-spacing-8",
      Subheader: "--mi-spacing-8",
      Body: "--mi-spacing-12",
      Caption: "--mi-spacing-8",
    },
    Caption: {
      Display: "--mi-spacing-8",
      Header: "--mi-spacing-8",
      Subheader: "--mi-spacing-4",
      Body: "--mi-spacing-8",
      Caption: "--mi-spacing-4",
    },
  },
  dense: {
    Display: {
      Display: "--mi-spacing-8",
      Header: "--mi-spacing-8",
      Subheader: "--mi-spacing-8",
      Body: "--mi-spacing-8",
      Caption: "--mi-spacing-4",
    },
    Header: {
      Display: "--mi-spacing-8",
      Header: "--mi-spacing-8",
      Subheader: "--mi-spacing-4",
      Body: "--mi-spacing-8",
      Caption: "--mi-spacing-4",
    },
    Subheader: {
      Display: "--mi-spacing-4",
      Header: "--mi-spacing-4",
      Subheader: "--mi-spacing-4",
      Body: "--mi-spacing-4",
      Caption: "--mi-spacing-2",
    },
    Body: {
      Display: "--mi-spacing-8",
      Header: "--mi-spacing-4",
      Subheader: "--mi-spacing-4",
      Body: "--mi-spacing-8",
      Caption: "--mi-spacing-2",
    },
    Caption: {
      Display: "--mi-spacing-4",
      Header: "--mi-spacing-2",
      Subheader: "--mi-spacing-2",
      Body: "--mi-spacing-2",
      Caption: "--mi-spacing-2",
    },
  },
};

const tokenOverrides: Array<{
  top: TextSpacingVariant[];
  bottom: TextSpacingVariant[];
  token: string;
}> = [
  {
    top: ["Subheader 2"],
    bottom: ["Body 1"],
    token: "--mi-spacing-2",
  },
  {
    top: ["Body 2"],
    bottom: ["Body 1"],
    token: "--mi-spacing-2",
  },
  {
    top: ["Body 2", "Subheader 2"],
    bottom: ["Caption 2"],
    token: "--mi-spacing-0",
  },
];

export const getTextSpacingToken = (
  topVariant: TextSpacingVariant,
  bottomVariant: TextSpacingVariant,
  mode: TextSpacingMode = "default",
) => {
  const override = tokenOverrides.find(
    (rule) => rule.top.includes(topVariant) && rule.bottom.includes(bottomVariant),
  );
  if (override) return override.token;

  const topRole = variantRoleMap[topVariant];
  const bottomRole = variantRoleMap[bottomVariant];
  return spacingMatrix[mode][topRole][bottomRole];
};

const spacingPxMap: Record<string, number> = {
  "--mi-spacing-0": 0,
  "--mi-spacing-2": 2,
  "--mi-spacing-4": 4,
  "--mi-spacing-8": 8,
  "--mi-spacing-12": 12,
};

export const getTextSpacingPx = (token: string) => spacingPxMap[token] ?? null;
