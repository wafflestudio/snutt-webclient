//https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never
};

type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];

export type SubType<Base, Condition> = Pick<
  Base,
  AllowedNames<Base, Condition>
>;
