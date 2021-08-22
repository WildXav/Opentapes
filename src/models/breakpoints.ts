const sm = 768;
const md = 992;
const lg = 1200;
const xl = 1920;

export class Breakpoints {
  readonly xsOnly: boolean;
  readonly smOnly: boolean;
  readonly mdOnly: boolean;
  readonly lgOnly: boolean;
  readonly xlOnly: boolean;

  // Less than
  readonly lt: {
    readonly sm: boolean;
    readonly md: boolean;
    readonly lg: boolean;
    readonly xl: boolean;
  };

  // Greater than
  readonly gt: {
    readonly xs: boolean;
    readonly sm: boolean;
    readonly md: boolean;
    readonly lg: boolean;
  };

  constructor(width?: number) {
    this.xsOnly = width ? width < sm : false;
    this.smOnly = width ? width >= sm && width < md : false;
    this.mdOnly = width ? width >= md && width < lg : false;
    this.lgOnly = width ? width >= lg && width < xl : false;
    this.xlOnly = width ? width >= xl : false;

    this.lt = {
      sm: width ? width < sm : false,
      md: width ? width < md : false,
      lg: width ? width < lg : false,
      xl: width ? width < xl : false,
    };

    this.gt = {
      xs: width ? width >= sm : false,
      sm: width ? width >= md : false,
      md: width ? width >= lg : false,
      lg: width ? width >= xl : false,
    };
  }
}
