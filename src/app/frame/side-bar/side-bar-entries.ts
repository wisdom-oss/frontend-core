/** Nullable string. */
type nullString = string | null;
/** [identifier name, icon name, path] */
type SideBarEntry = [string, nullString, nullString];

type SideBarLabel = [string, nullString, SideBarEntryLvl1[]];
type SideBarEntryLvl1 = [string, nullString, nullString, SideBarEntryLvl2[]] | SideBarEntry;
type SideBarEntryLvl2 = [string, nullString, nullString, SideBarEntryLvl3[]] | SideBarEntry;
type SideBarEntryLvl3 = SideBarEntry;


export type SideBarEntries = SideBarLabel[];
