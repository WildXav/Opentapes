const sm = 640;
const md = 768;
const lg = 1024;
const xl = 1280;
const xxl = 1536;

export class Breakpoints {
  readonly xsOnly: boolean;
  readonly smOnly: boolean;
  readonly mdOnly: boolean;
  readonly lgOnly: boolean;
  readonly xlOnly: boolean;
  readonly xxlOnly: boolean;

  // Less than
  readonly lt: {
    readonly sm: boolean;
    readonly md: boolean;
    readonly lg: boolean;
    readonly xl: boolean;
    readonly xxl: boolean;
  };

  // Greater than
  readonly gt: {
    readonly xs: boolean;
    readonly sm: boolean;
    readonly md: boolean;
    readonly lg: boolean;
    readonly xl: boolean;
  };

  constructor(width?: number) {
    this.xsOnly = width ? width < sm : false;
    this.smOnly = width ? width >= sm && width < md : false;
    this.mdOnly = width ? width >= md && width < lg : false;
    this.lgOnly = width ? width >= lg && width < xl : false;
    this.xlOnly = width ? width >= xl && width < xxl : false;
    this.xxlOnly = width ? width >= xxl : false;

    this.lt = {
      sm: width ? width < sm : false,
      md: width ? width < md : false,
      lg: width ? width < lg : false,
      xl: width ? width < xl : false,
      xxl: width ? width < xxl : false,
    };

    this.gt = {
      xs: width ? width >= sm : false,
      sm: width ? width >= md : false,
      md: width ? width >= lg : false,
      lg: width ? width >= xl : false,
      xl: width ? width >= xxl : false,
    };
  }
}
